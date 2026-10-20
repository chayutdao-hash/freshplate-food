/**
 * FreshPlate - SQLite Database Layer
 * Uses Node.js v24 native built-in `node:sqlite`
 */

const { DatabaseSync } = require('node:sqlite');
const crypto = require('node:crypto');
const path = require('node:path');

const DB_PATH = path.join(__dirname, 'freshplate.db');
const db = new DatabaseSync(DB_PATH);

// Initialize Tables
function initDatabase() {
  // 1. Users Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      salt TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user', -- 'user' or 'admin'
      target_calories INTEGER NOT NULL DEFAULT 2000,
      target_protein INTEGER NOT NULL DEFAULT 130,
      target_carbs INTEGER NOT NULL DEFAULT 210,
      target_fat INTEGER NOT NULL DEFAULT 65,
      health_goal TEXT DEFAULT 'รักษาสุขภาพทั่วไป',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Consultations & Advice Table (User questions <-> Admin replies)
  db.exec(`
    CREATE TABLE IF NOT EXISTS consultations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      subject TEXT NOT NULL,
      question TEXT NOT NULL,
      health_goal TEXT,
      admin_reply TEXT,
      replied_by_admin_id INTEGER,
      status TEXT NOT NULL DEFAULT 'pending', -- 'pending' or 'answered'
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      replied_at DATETIME,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (replied_by_admin_id) REFERENCES users(id)
    );
  `);

  // 3. User Sessions Table
  db.exec(`
    CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      expires_at DATETIME NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // 4. User Personal Data Sync (Meal Plans & Saved Recipes)
  db.exec(`
    CREATE TABLE IF NOT EXISTS user_data (
      user_id INTEGER PRIMARY KEY,
      meal_plan TEXT,
      saved_recipes TEXT,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `);

  // Seed Admin & Demo User if not existing
  seedInitialUsers();
}

// Password hashing with PBKDF2
function hashPassword(password, salt) {
  if (!salt) {
    salt = crypto.randomBytes(16).toString('hex');
  }
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return { hash, salt };
}

function verifyPassword(password, hash, salt) {
  const checkHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex');
  return checkHash === hash;
}

function seedInitialUsers() {
  const checkAdmin = db.prepare('SELECT id FROM users WHERE email = ?').get('admin@freshplate.com');
  if (!checkAdmin) {
    const { hash, salt } = hashPassword('admin1234');
    db.prepare(`
      INSERT INTO users (name, email, password_hash, salt, role, target_calories, target_protein, target_carbs, target_fat, health_goal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'โค้ชแพรวา (นักโภชนาการ Admin)',
      'admin@freshplate.com',
      hash,
      salt,
      'admin',
      2000,
      130,
      210,
      65,
      'ที่ปรึกษาโภชนาการมืออาชีพ'
    );
    console.log('Seeded Admin user: admin@freshplate.com / admin1234');
  }

  const checkUser = db.prepare('SELECT id FROM users WHERE email = ?').get('user@freshplate.com');
  let demoUserId;
  if (!checkUser) {
    const { hash, salt } = hashPassword('user1234');
    const res = db.prepare(`
      INSERT INTO users (name, email, password_hash, salt, role, target_calories, target_protein, target_carbs, target_fat, health_goal)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'สมชาย สุขภาพดี',
      'user@freshplate.com',
      hash,
      salt,
      'user',
      1850,
      140,
      180,
      55,
      'เพิ่มกล้ามเนื้อ & ลดไขมัน'
    );
    demoUserId = res.lastInsertRowid;
    console.log('Seeded Demo user: user@freshplate.com / user1234');
  } else {
    demoUserId = checkUser.id;
  }

  // Seed sample consultation
  const checkConsult = db.prepare('SELECT id FROM consultations WHERE user_id = ?').get(demoUserId);
  if (!checkConsult) {
    const adminUser = db.prepare("SELECT id FROM users WHERE role = 'admin'").get();
    db.prepare(`
      INSERT INTO consultations (user_id, subject, question, health_goal, admin_reply, replied_by_admin_id, status, replied_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).run(
      demoUserId,
      'ขอคำแนะนำการจัดมื้อเย็นสำหรับคนออกกำลังกาย',
      'ปกติผมออกกำลังกายตอน 18.00 น. ช่วงค่ำควรทานแซลมอนหรืออกไก่ดีครับ และควรเลี่ยงคาร์บประเภทไหนเพื่อไม่ให้อืดท้องก่อนนอน?',
      'เพิ่มกล้ามเนื้อ & ลดไขมัน',
      'สวัสดีค่ะคุณสมชาย! แนะนำให้ทาน "แซลมอนย่างเทอริยากิ" หรือ "อกไก่ย่างสมุนไพร" ได้ทั้งสองเมนูเลยค่ะ เพราะให้โปรตีนสูงกว่า 38g ช่วยซ่อมแซมกล้ามเนื้อหลังออกกำลังกายได้ดีเยี่ยม สำหรับคาร์บช่วงค่ำ แนะนำเป็น "ข้าวกล้องปริมาณครึ่งทัพพี" หรือ "ควินัว" ที่ย่อยง่ายและไม่ทำให้น้ำตาลในเลือดเหวี่ยงก่อนนอนค่ะ',
      adminUser ? adminUser.id : 1,
      'answered'
    );
    console.log('Seeded demo consultation item');
  }
}

// User CRUD Helpers
const UserModel = {
  findByEmail(email) {
    return db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  },

  findById(id) {
    return db.prepare('SELECT id, name, email, role, target_calories, target_protein, target_carbs, target_fat, health_goal, created_at FROM users WHERE id = ?').get(id);
  },

  create({ name, email, password, target_calories = 2000, target_protein = 130, target_carbs = 210, target_fat = 65, health_goal = 'รักษาสุขภาพทั่วไป' }) {
    const { hash, salt } = hashPassword(password);
    const result = db.prepare(`
      INSERT INTO users (name, email, password_hash, salt, role, target_calories, target_protein, target_carbs, target_fat, health_goal)
      VALUES (?, ?, ?, ?, 'user', ?, ?, ?, ?, ?)
    `).run(name, email, hash, salt, target_calories, target_protein, target_carbs, target_fat, health_goal);
    return this.findById(result.lastInsertRowid);
  },

  getAllUsers() {
    return db.prepare(`
      SELECT u.id, u.name, u.email, u.role, u.target_calories, u.health_goal, u.created_at,
             COUNT(c.id) as consultation_count
      FROM users u
      LEFT JOIN consultations c ON u.id = c.user_id
      GROUP BY u.id
      ORDER BY u.created_at DESC
    `).all();
  },

  updateProfile(id, { name, target_calories, target_protein, target_carbs, target_fat, health_goal }) {
    db.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          target_calories = COALESCE(?, target_calories),
          target_protein = COALESCE(?, target_protein),
          target_carbs = COALESCE(?, target_carbs),
          target_fat = COALESCE(?, target_fat),
          health_goal = COALESCE(?, health_goal)
      WHERE id = ?
    `).run(
      name || null,
      target_calories !== undefined ? parseInt(target_calories) : null,
      target_protein !== undefined ? parseInt(target_protein) : null,
      target_carbs !== undefined ? parseInt(target_carbs) : null,
      target_fat !== undefined ? parseInt(target_fat) : null,
      health_goal || null,
      id
    );
    return this.findById(id);
  },

  updatePassword(id, newPassword) {
    const { hash, salt } = hashPassword(newPassword);
    db.prepare(`
      UPDATE users
      SET password_hash = ?, salt = ?
      WHERE id = ?
    `).run(hash, salt, id);
    return true;
  },

  getUserData(userId) {
    const row = db.prepare('SELECT meal_plan, saved_recipes FROM user_data WHERE user_id = ?').get(userId);
    if (!row) return null;
    return {
      mealPlan: row.meal_plan ? JSON.parse(row.meal_plan) : null,
      savedRecipes: row.saved_recipes ? JSON.parse(row.saved_recipes) : null
    };
  },

  saveUserData(userId, { mealPlan, savedRecipes }) {
    const existing = db.prepare('SELECT user_id FROM user_data WHERE user_id = ?').get(userId);
    const mealPlanStr = mealPlan ? JSON.stringify(mealPlan) : null;
    const savedRecipesStr = savedRecipes ? JSON.stringify(savedRecipes) : null;
    if (existing) {
      db.prepare(`
        UPDATE user_data
        SET meal_plan = COALESCE(?, meal_plan),
            saved_recipes = COALESCE(?, saved_recipes),
            updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `).run(mealPlanStr, savedRecipesStr, userId);
    } else {
      db.prepare(`
        INSERT INTO user_data (user_id, meal_plan, saved_recipes)
        VALUES (?, ?, ?)
      `).run(userId, mealPlanStr, savedRecipesStr);
    }
    return this.getUserData(userId);
  }
};

// Session CRUD Helpers
const SessionModel = {
  create(userId) {
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
    db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expiresAt);
    return token;
  },

  getUserByToken(token) {
    if (!token) return null;
    const session = db.prepare(`
      SELECT s.token, s.expires_at, u.id, u.name, u.email, u.role, u.target_calories, u.target_protein, u.target_carbs, u.target_fat, u.health_goal
      FROM sessions s
      JOIN users u ON s.user_id = u.id
      WHERE s.token = ?
    `).get(token);

    if (!session) return null;
    if (new Date(session.expires_at) < new Date()) {
      this.delete(token);
      return null;
    }
    return session;
  },

  delete(token) {
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
  }
};

// Consultation & Admin Advice Helpers
const ConsultationModel = {
  create({ userId, subject, question, health_goal }) {
    const res = db.prepare(`
      INSERT INTO consultations (user_id, subject, question, health_goal, status)
      VALUES (?, ?, ?, ?, 'pending')
    `).run(userId, subject, question, health_goal || null);
    return this.getById(res.lastInsertRowid);
  },

  getById(id) {
    return db.prepare(`
      SELECT c.*, u.name as user_name, u.email as user_email, u.target_calories as user_target_cal,
             a.name as admin_name
      FROM consultations c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN users a ON c.replied_by_admin_id = a.id
      WHERE c.id = ?
    `).get(id);
  },

  getByUserId(userId) {
    return db.prepare(`
      SELECT c.*, a.name as admin_name
      FROM consultations c
      LEFT JOIN users a ON c.replied_by_admin_id = a.id
      WHERE c.user_id = ?
      ORDER BY c.created_at DESC
    `).all(userId);
  },

  getAll(statusFilter) {
    let query = `
      SELECT c.*, u.name as user_name, u.email as user_email, u.target_calories as user_target_cal,
             a.name as admin_name
      FROM consultations c
      JOIN users u ON c.user_id = u.id
      LEFT JOIN users a ON c.replied_by_admin_id = a.id
    `;
    const params = [];
    if (statusFilter && statusFilter !== 'all') {
      query += ` WHERE c.status = ?`;
      params.push(statusFilter);
    }
    query += ` ORDER BY CASE WHEN c.status = 'pending' THEN 0 ELSE 1 END, c.created_at DESC`;
    return db.prepare(query).all(...params);
  },

  reply({ id, adminId, replyText }) {
    db.prepare(`
      UPDATE consultations
      SET admin_reply = ?, replied_by_admin_id = ?, status = 'answered', replied_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(replyText, adminId, id);
    return this.getById(id);
  },

  getStats() {
    const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'user'").get().count;
    const totalConsultations = db.prepare("SELECT COUNT(*) as count FROM consultations").get().count;
    const pendingConsultations = db.prepare("SELECT COUNT(*) as count FROM consultations WHERE status = 'pending'").get().count;
    const answeredConsultations = db.prepare("SELECT COUNT(*) as count FROM consultations WHERE status = 'answered'").get().count;

    return {
      totalUsers,
      totalConsultations,
      pendingConsultations,
      answeredConsultations
    };
  }
};

// Initialize DB on require
initDatabase();

module.exports = {
  db,
  UserModel,
  SessionModel,
  ConsultationModel,
  verifyPassword
};
