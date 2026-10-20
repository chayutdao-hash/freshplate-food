const http = require('http');
const fs = require('fs');
const path = require('path');
const { UserModel, SessionModel, ConsultationModel, verifyPassword } = require('./database');

const PORT = process.env.PORT || 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml'
};

// Helper: Parse JSON Body
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 1e6) { // 1MB limit
        req.destroy();
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        const json = body ? JSON.parse(body) : {};
        resolve(json);
      } catch (err) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

// Helper: JSON response
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
  });
  res.end(JSON.stringify(data));
}

// Helper: Get user from Authorization header
function getAuthUser(req) {
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!token) return null;
  return SessionModel.getUserByToken(token);
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS'
    });
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method.toUpperCase();

  // =========================================================================
  // API ROUTES
  // =========================================================================

  // 0. GET /api/health (Cloud Health Check)
  if (pathname === '/api/health' && method === 'GET') {
    return sendJson(res, 200, { status: 'ok', timestamp: new Date().toISOString() });
  }

  // 1. POST /api/auth/register
  if (pathname === '/api/auth/register' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { name, email, password, target_calories, health_goal } = body;

      if (!name || !email || !password) {
        return sendJson(res, 400, { success: false, message: 'กรุณากรอกชื่อ อีเมล และรหัสผ่านให้ครบถ้วน' });
      }

      if (password.length < 6) {
        return sendJson(res, 400, { success: false, message: 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
      }

      const existingUser = UserModel.findByEmail(email.toLowerCase().trim());
      if (existingUser) {
        return sendJson(res, 409, { success: false, message: 'อีเมลนี้ถูกใช้งานแล้วในระบบ' });
      }

      const newUser = UserModel.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password,
        target_calories: parseInt(target_calories) || 2000,
        health_goal: health_goal || 'รักษาสุขภาพทั่วไป'
      });

      const token = SessionModel.create(newUser.id);
      return sendJson(res, 201, {
        success: true,
        message: 'สมัครสมาชิกสำเร็จ!',
        token,
        user: newUser
      });
    } catch (err) {
      console.error('Register error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการสมัครสมาชิก' });
    }
  }

  // 2. POST /api/auth/login
  if (pathname === '/api/auth/login' && method === 'POST') {
    try {
      const body = await parseJsonBody(req);
      const { email, password } = body;

      if (!email || !password) {
        return sendJson(res, 400, { success: false, message: 'กรุณากรอกอีเมลและรหัสผ่าน' });
      }

      const user = UserModel.findByEmail(email.toLowerCase().trim());
      if (!user) {
        return sendJson(res, 401, { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
      }

      const isValid = verifyPassword(password, user.password_hash, user.salt);
      if (!isValid) {
        return sendJson(res, 401, { success: false, message: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
      }

      const token = SessionModel.create(user.id);
      const userProfile = UserModel.findById(user.id);

      return sendJson(res, 200, {
        success: true,
        message: `ยินดีต้อนรับคุณ ${user.name}!`,
        token,
        user: userProfile
      });
    } catch (err) {
      console.error('Login error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ' });
    }
  }

  // 3. POST /api/auth/logout
  if (pathname === '/api/auth/logout' && method === 'POST') {
    const authHeader = req.headers['authorization'] || '';
    const token = authHeader.replace(/^Bearer\s+/i, '').trim();
    if (token) {
      SessionModel.delete(token);
    }
    return sendJson(res, 200, { success: true, message: 'ออกจากระบบสำเร็จ' });
  }

  // 4. GET /api/auth/me
  if (pathname === '/api/auth/me' && method === 'GET') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบ' });
    }
    return sendJson(res, 200, { success: true, user });
  }

  // 4.1 PUT /api/auth/profile (Update name, nutrition targets, health goal)
  if (pathname === '/api/auth/profile' && method === 'PUT') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบ' });
    }
    try {
      const body = await parseJsonBody(req);
      const updatedUser = UserModel.updateProfile(user.id, body);
      return sendJson(res, 200, {
        success: true,
        message: 'อัปเดตข้อมูลโปรไฟล์และเป้าหมายโภชนาการเรียบร้อยแล้ว!',
        user: updatedUser
      });
    } catch (err) {
      console.error('Update profile error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' });
    }
  }

  // 4.2 PUT /api/auth/change-password
  if (pathname === '/api/auth/change-password' && method === 'PUT') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบ' });
    }
    try {
      const body = await parseJsonBody(req);
      const { currentPassword, newPassword } = body;
      if (!currentPassword || !newPassword) {
        return sendJson(res, 400, { success: false, message: 'กรุณากรอกรหัสผ่านเดิมและรหัสผ่านใหม่' });
      }
      if (newPassword.length < 6) {
        return sendJson(res, 400, { success: false, message: 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร' });
      }
      const fullUser = UserModel.findByEmail(user.email);
      const isValid = verifyPassword(currentPassword, fullUser.password_hash, fullUser.salt);
      if (!isValid) {
        return sendJson(res, 400, { success: false, message: 'รหัสผ่านปัจจุบันไม่ถูกต้อง' });
      }
      UserModel.updatePassword(user.id, newPassword);
      return sendJson(res, 200, { success: true, message: 'เปลี่ยนรหัสผ่านสำเร็จเรียบร้อยแล้ว!' });
    } catch (err) {
      console.error('Change password error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน' });
    }
  }

  // 4.3 GET /api/user/sync (Get synced meal plan & saved recipes)
  if (pathname === '/api/user/sync' && method === 'GET') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบ' });
    }
    const data = UserModel.getUserData(user.id) || { mealPlan: null, savedRecipes: null };
    return sendJson(res, 200, { success: true, data });
  }

  // 4.4 POST /api/user/sync (Save user's meal plan & saved recipes)
  if (pathname === '/api/user/sync' && method === 'POST') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบ' });
    }
    try {
      const body = await parseJsonBody(req);
      const saved = UserModel.saveUserData(user.id, body);
      return sendJson(res, 200, { success: true, data: saved });
    } catch (err) {
      console.error('Sync save error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการซิงค์ข้อมูล' });
    }
  }

  // 5. POST /api/consultations (User asks for advice)
  if (pathname === '/api/consultations' && method === 'POST') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบเพื่อปรึกษาโภชนาการ' });
    }

    try {
      const body = await parseJsonBody(req);
      const { subject, question, health_goal } = body;

      if (!subject || !question) {
        return sendJson(res, 400, { success: false, message: 'กรุณาระบุหัวข้อและรายละเอียดคำถาม' });
      }

      const consultation = ConsultationModel.create({
        userId: user.id,
        subject: subject.trim(),
        question: question.trim(),
        health_goal: health_goal || user.health_goal
      });

      return sendJson(res, 201, {
        success: true,
        message: 'ส่งคำถามถึงผู้เชี่ยวชาญ/Admin เรียบร้อยแล้ว!',
        consultation
      });
    } catch (err) {
      console.error('Create consultation error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการส่งคำถาม' });
    }
  }

  // 6. GET /api/consultations/my (User views own questions & admin replies)
  if (pathname === '/api/consultations/my' && method === 'GET') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 401, { success: false, message: 'กรุณาเข้าสู่ระบบ' });
    }

    const items = ConsultationModel.getByUserId(user.id);
    return sendJson(res, 200, { success: true, consultations: items });
  }

  // 7. GET /api/admin/consultations (Admin views all questions)
  if (pathname === '/api/admin/consultations' && method === 'GET') {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { success: false, message: 'สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' });
    }

    const statusFilter = parsedUrl.searchParams.get('status') || 'all';
    const items = ConsultationModel.getAll(statusFilter);
    return sendJson(res, 200, { success: true, consultations: items });
  }

  // 8. POST /api/admin/consultations/:id/reply (Admin sends advice)
  const replyMatch = pathname.match(/^\/api\/admin\/consultations\/(\d+)\/reply$/);
  if (replyMatch && method === 'POST') {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { success: false, message: 'สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' });
    }

    try {
      const consultId = parseInt(replyMatch[1]);
      const body = await parseJsonBody(req);
      const { replyText } = body;

      if (!replyText || !replyText.trim()) {
        return sendJson(res, 400, { success: false, message: 'กรุณาระบุข้อความคำแนะนำ' });
      }

      const updated = ConsultationModel.reply({
        id: consultId,
        adminId: user.id,
        replyText: replyText.trim()
      });

      return sendJson(res, 200, {
        success: true,
        message: 'ส่งคำแนะนำให้ผู้ใช้เรียบร้อยแล้ว!',
        consultation: updated
      });
    } catch (err) {
      console.error('Admin reply error:', err);
      return sendJson(res, 500, { success: false, message: 'เกิดข้อผิดพลาดในการส่งคำแนะนำ' });
    }
  }

  // 9. GET /api/admin/users (Admin views user directory)
  if (pathname === '/api/admin/users' && method === 'GET') {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { success: false, message: 'สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' });
    }

    const users = UserModel.getAllUsers();
    return sendJson(res, 200, { success: true, users });
  }

  // 10. GET /api/admin/stats (Admin stats)
  if (pathname === '/api/admin/stats' && method === 'GET') {
    const user = getAuthUser(req);
    if (!user || user.role !== 'admin') {
      return sendJson(res, 403, { success: false, message: 'สงวนสิทธิ์เฉพาะผู้ดูแลระบบ (Admin) เท่านั้น' });
    }

    const stats = ConsultationModel.getStats();
    return sendJson(res, 200, { success: true, stats });
  }

  // =========================================================================
  // STATIC FILES SERVING
  // =========================================================================
  let reqPath = pathname;
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  const filePath = path.join(__dirname, reqPath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`FreshPlate server running at http://localhost:${PORT}/`);
});
