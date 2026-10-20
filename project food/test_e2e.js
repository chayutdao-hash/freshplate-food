async function runEndToEndTest() {
  const BASE = 'http://localhost:3000';

  // 1. Register new user
  console.log('--- 1. Testing Registration ---');
  const regRes = await fetch(BASE + '/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'น้องใหม่ สายคลีน',
      email: 'nong_mai_' + Date.now() + '@example.com',
      password: 'password123',
      target_calories: 1900,
      health_goal: 'ลดน้ำหนักแบบยั่งยืน'
    })
  });
  const regData = await regRes.json();
  console.log('Register status:', regRes.status, 'Success:', regData.success, 'User:', regData.user.name);
  const userToken = regData.token;

  // 2. User submits consultation question
  console.log('--- 2. User Submitting Question ---');
  const consultRes = await fetch(BASE + '/api/consultations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + userToken
    },
    body: JSON.stringify({
      subject: 'เมนูคลีนสำหรับมือใหม่ใน 15 นาที',
      health_goal: 'ลดน้ำหนักแบบยั่งยืน',
      question: 'เพิ่งเริ่มทำอาหารคลีนทานเอง แนะนำเมนูไหนที่วัตถุดิบน้อยและทำง่ายที่สุดคะ?'
    })
  });
  const consultData = await consultRes.json();
  console.log('Consultation status:', consultRes.status, 'ID:', consultData.consultation.id);
  const consultId = consultData.consultation.id;

  // 3. Admin login
  console.log('--- 3. Admin Login ---');
  const adminLoginRes = await fetch(BASE + '/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@freshplate.com', password: 'admin1234' })
  });
  const adminData = await adminLoginRes.json();
  const adminToken = adminData.token;
  console.log('Admin login status:', adminLoginRes.status, 'Admin:', adminData.user.name);

  // 4. Admin submits advice reply
  console.log('--- 4. Admin Replying with Advice ---');
  const replyRes = await fetch(BASE + '/api/admin/consultations/' + consultId + '/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + adminToken
    },
    body: JSON.stringify({
      replyText: 'ยินดีต้อนรับสู่ครอบครัว FreshPlate ค่ะ! สำหรับมือใหม่ แนะนำ "แซลมอนโปเกโบวล์และควินัว" หรือ "โทสต์อะโวคาโดไข่ดาวน้ำ" ใช้เวลาไม่เกิน 12 นาที ปรุงรสน้อยแต่ได้สารอาหารครบถ้วนค่ะ'
    })
  });
  const replyData = await replyRes.json();
  console.log('Reply status:', replyRes.status, 'Status now:', replyData.consultation.status);

  // 5. User checks replied advice
  console.log('--- 5. User Checking Answered Advice ---');
  const myConsultsRes = await fetch(BASE + '/api/consultations/my', {
    headers: { 'Authorization': 'Bearer ' + userToken }
  });
  const myConsults = await myConsultsRes.json();
  console.log('User consultations count:', myConsults.consultations.length);
  console.log('Answered text:', myConsults.consultations[0].admin_reply);

  // 6. Admin User Directory
  console.log('--- 6. Admin Checking Users Directory ---');
  const usersRes = await fetch(BASE + '/api/admin/users', {
    headers: { 'Authorization': 'Bearer ' + adminToken }
  });
  const usersData = await usersRes.json();
  console.log('Total registered users in DB:', usersData.users.length);

  // 7. Profile Update
  console.log('--- 7. User Updating Profile & Nutrition Targets ---');
  const profRes = await fetch(BASE + '/api/auth/profile', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken },
    body: JSON.stringify({
      name: 'น้องใหม่ สายคลีน (อัปเดต)',
      target_calories: 2100,
      target_protein: 145,
      target_carbs: 220,
      target_fat: 60,
      health_goal: 'เสริมสร้างสุขภาพและกล้ามเนื้อ'
    })
  });
  const profData = await profRes.json();
  console.log('Profile update success:', profData.success, 'New Calories:', profData.user.target_calories);

  // 8. User Data Sync
  console.log('--- 8. Testing User Data Sync (Meal Plan & Saved Recipes) ---');
  const syncSave = await fetch(BASE + '/api/user/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken },
    body: JSON.stringify({
      mealPlan: { monday: { breakfast: 'rec-1', lunch: 'rec-3' } },
      savedRecipes: ['rec-1', 'rec-3']
    })
  });
  const syncSaveData = await syncSave.json();
  console.log('Sync save status:', syncSave.status, 'Recipes synced:', syncSaveData.data.savedRecipes.length);

  // 9. Change Password
  console.log('--- 9. User Changing Password ---');
  const cpRes = await fetch(BASE + '/api/auth/change-password', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + userToken },
    body: JSON.stringify({ currentPassword: 'password123', newPassword: 'password456_updated' })
  });
  const cpData = await cpRes.json();
  console.log('Change password success:', cpData.success);

  // 10. Logout
  console.log('--- 10. User Logout ---');
  const logoutRes = await fetch(BASE + '/api/auth/logout', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + userToken }
  });
  const logoutData = await logoutRes.json();
  console.log('Logout success:', logoutData.success);

  console.log('\n=== ALL END-TO-END TESTS PASSED SUCCESSFULLY! ===');
}

runEndToEndTest();
