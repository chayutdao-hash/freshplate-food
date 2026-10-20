/**
 * FreshPlate - Recipe Library & Weekly Meal Planner
 * Main Application Logic & Interactivity
 * Includes Authentication, Database Sync, and Admin Consultation Dashboard
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. APPLICATION STATE
  // =========================================================================
  const state = {
    currentView: 'exploreView',
    searchQuery: '',
    activeCategory: 'all',
    activeBadge: 'all',
    selectedPantryIds: new Set(),
    savedRecipeIds: new Set(JSON.parse(localStorage.getItem('freshplate_saved') || '["rec-1", "rec-3"]')),
    mealPlan: JSON.parse(localStorage.getItem('freshplate_mealplan') || JSON.stringify(INITIAL_MEAL_PLAN)),
    activePlannerDay: 'monday',
    currentDetailRecipeId: 'rec-1',
    currentServings: 2,
    checkedIngredients: new Set(),
    boughtShoppingItems: new Set(JSON.parse(localStorage.getItem('freshplate_bought') || '[]')),
    activeTimers: {}, // stepId -> { remaining, total, intervalId, isRunning }
    modalTargetSlot: null, // for Add to Plan modal: { day, meal, recipeId }

    // User & Authentication State
    currentUser: null,
    authToken: localStorage.getItem('freshplate_token') || null,
    isSupabaseUser: false,
    userConsultations: [],
    adminConsultations: [],
    adminFilter: 'all'
  };

  const DAYS_ORDER = [
    { key: 'monday', th: 'วันจันทร์', short: 'จ.' },
    { key: 'tuesday', th: 'วันอังคาร', short: 'อ.' },
    { key: 'wednesday', th: 'วันพุธ', short: 'พ.' },
    { key: 'thursday', th: 'วันพฤหัสบดี', short: 'พฤ.' },
    { key: 'friday', th: 'วันศุกร์', short: 'ศ.' },
    { key: 'saturday', th: 'วันเสาร์', short: 'ส.' },
    { key: 'sunday', th: 'วันอาทิตย์', short: 'อา.' }
  ];

  const MEAL_TYPES = [
    { key: 'breakfast', th: 'มื้อเช้า', icon: '🌅' },
    { key: 'lunch', th: 'มื้อกลางวัน', icon: '☀️' },
    { key: 'dinner', th: 'มื้อเย็น', icon: '🌙' },
    { key: 'snack', th: 'อาหารว่าง', icon: '🍎' }
  ];

  // =========================================================================
  // 2. DOM ELEMENTS
  // =========================================================================
  const views = {
    exploreView: document.getElementById('exploreView'),
    plannerView: document.getElementById('plannerView'),
    detailView: document.getElementById('detailView')
  };

  const navTabs = {
    exploreView: document.getElementById('tabExplore'),
    plannerView: document.getElementById('tabPlanner'),
    detailView: document.getElementById('tabDetail')
  };

  const recipeGrid = document.getElementById('recipeGrid');
  const recipeSearchInput = document.getElementById('recipeSearchInput');
  const btnClearSearch = document.getElementById('btnClearSearch');
  const resultsCountText = document.getElementById('resultsCountText');
  const quickBadgeButtons = document.querySelectorAll('.quick-badge-btn');
  const categoryPills = document.querySelectorAll('.category-pill');

  // Meal Planner DOM
  const sidebarRecipeList = document.getElementById('sidebarRecipeList');
  const sidebarSearchInput = document.getElementById('sidebarSearchInput');
  const weeklyDaysGrid = document.getElementById('weeklyDaysGrid');
  const daySelectorPills = document.getElementById('daySelectorPills');
  const navPlannerCount = document.getElementById('navPlannerCount');
  const btnClearMealPlan = document.getElementById('btnClearMealPlan');

  // Nutrition Panel DOM
  const nutritionDayTag = document.getElementById('nutritionDayTag');
  const calorieCircleProgress = document.getElementById('calorieCircleProgress');
  const dialPercentText = document.getElementById('dialPercentText');
  const calCurrentText = document.getElementById('calCurrentText');
  const calTargetText = document.getElementById('calTargetText');
  const calRemainingText = document.getElementById('calRemainingText');
  const proteinValText = document.getElementById('proteinValText');
  const proteinProgressFill = document.getElementById('proteinProgressFill');
  const carbsValText = document.getElementById('carbsValText');
  const carbsProgressFill = document.getElementById('carbsProgressFill');
  const fatValText = document.getElementById('fatValText');
  const fatProgressFill = document.getElementById('fatProgressFill');
  const fiberValText = document.getElementById('fiberValText');
  const fiberProgressFill = document.getElementById('fiberProgressFill');
  const nutritionAlertCard = document.getElementById('nutritionAlertCard');
  const nutritionAlertText = document.getElementById('nutritionAlertText');

  // Modals
  const pantryModalBackdrop = document.getElementById('pantryModalBackdrop');
  const shoppingModalBackdrop = document.getElementById('shoppingModalBackdrop');
  const addToPlanModalBackdrop = document.getElementById('addToPlanModalBackdrop');
  const pantryTagsGrid = document.getElementById('pantryTagsGrid');
  const pantryMatchCount = document.getElementById('pantryMatchCount');
  const shoppingListContainer = document.getElementById('shoppingListContainer');
  const headerShoppingCount = document.getElementById('headerShoppingCount');

  // Auth, Profile & Admin Modals
  const authModalBackdrop = document.getElementById('authModalBackdrop');
  const consultationModalBackdrop = document.getElementById('consultationModalBackdrop');
  const adminDashboardModalBackdrop = document.getElementById('adminDashboardModalBackdrop');
  const profileModalBackdrop = document.getElementById('profileModalBackdrop');
  const changePasswordModalBackdrop = document.getElementById('changePasswordModalBackdrop');
  const forgotModalBackdrop = document.getElementById('forgotModalBackdrop');
  const supabaseConfigModalBackdrop = document.getElementById('supabaseConfigModalBackdrop');
  const userAccountArea = document.getElementById('userAccountArea');
  const headerSupabaseDot = document.getElementById('headerSupabaseDot');
  const btnOpenSupabaseModal = document.getElementById('btnOpenSupabaseModal');
  const btnCloseSupabaseModal = document.getElementById('btnCloseSupabaseModal');
  const btnGoogleLogin = document.getElementById('btnGoogleLogin');
  const btnGoogleRegister = document.getElementById('btnGoogleRegister');

  // =========================================================================
  // 3. TOAST NOTIFICATION SYSTEM
  // =========================================================================
  function showToast(message, icon = '✅', duration = 3200) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="font-size:1.1rem;">${icon}</span> <span>${message}</span>`;
    toast.style.cursor = 'pointer';
    container.appendChild(toast);

    const dismiss = () => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px) scale(0.95)';
      toast.style.transition = 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => toast.remove(), 350);
    };

    toast.addEventListener('click', dismiss);
    setTimeout(dismiss, duration);
  }

  // =========================================================================
  // 4. AUTHENTICATION, USER MANAGEMENT & DATA SYNC
  // =========================================================================

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function showAuthAlert(containerId, type, message) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.className = `auth-alert-box ${type}`;
    const icon = type === 'error' ? '⚠️' : '✅';
    el.innerHTML = `<span>${icon}</span> <span>${escapeHtml(message)}</span>`;
    el.style.display = 'flex';
  }

  function hideAuthAlert(containerId) {
    const el = document.getElementById(containerId);
    if (el) {
      el.style.display = 'none';
      el.innerHTML = '';
    }
  }

  function setButtonLoading(button, isLoading, text) {
    if (!button) return;
    if (isLoading) {
      button.classList.add('loading');
      button.disabled = true;
    } else {
      button.classList.remove('loading');
      button.disabled = false;
      const textSpan = button.querySelector('.btn-text');
      if (textSpan && text) textSpan.textContent = text;
    }
  }

  // Data Synchronization Debounce
  let syncTimeout = null;
  function syncUserDataToServer() {
    // Always sync locally first for instant offline availability
    localStorage.setItem('freshplate_mealplan', JSON.stringify(state.mealPlan));
    localStorage.setItem('freshplate_saved', JSON.stringify(Array.from(state.savedRecipeIds)));

    if (!state.currentUser) return;
    clearTimeout(syncTimeout);
    syncTimeout = setTimeout(async () => {
      // 1. Sync to Supabase Cloud PostgreSQL if connected
      if (window.SupabaseService && window.SupabaseService.isConfigured() && state.currentUser) {
        try {
          await window.SupabaseService.saveUserMealData(
            state.currentUser.uid || String(state.currentUser.id),
            state.mealPlan,
            Array.from(state.savedRecipeIds)
          );
          console.log('⚡ Meal data saved to Supabase successfully');
        } catch (err) {
          console.warn('Sync to Supabase failed:', err);
        }
      }

      // 2. Sync to Node/SQLite Backend if using token
      if (state.authToken) {
        try {
          await fetch('/api/user/sync', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.authToken}`
            },
            body: JSON.stringify({
              mealPlan: state.mealPlan,
              savedRecipes: Array.from(state.savedRecipeIds)
            })
          });
        } catch (err) {
          console.warn('Sync to server failed:', err);
        }
      }
    }, 800);
  }

  async function syncUserDataFromServer() {
    if (state.isSupabaseUser && state.currentUser && window.SupabaseService) {
      try {
        const mealData = await window.SupabaseService.getUserMealData(state.currentUser.uid || state.currentUser.id);
        if (mealData) {
          let changed = false;
          if (mealData.mealPlan) {
            state.mealPlan = mealData.mealPlan;
            localStorage.setItem('freshplate_mealplan', JSON.stringify(state.mealPlan));
            changed = true;
          }
          if (mealData.savedRecipes && Array.isArray(mealData.savedRecipes)) {
            state.savedRecipeIds = new Set(mealData.savedRecipes);
            localStorage.setItem('freshplate_saved', JSON.stringify(Array.from(state.savedRecipeIds)));
            changed = true;
          }
          if (changed) {
            renderWeeklyTable();
            renderDaySelectorPills();
            renderRecipeGrid();
            updateTotalMealCountBadge();
            updateNutritionSummary();
          }
        }
      } catch (err) {
        console.warn('Sync from Firestore error:', err);
      }
      return;
    }

    if (!state.authToken) return;
    try {
      const res = await fetch('/api/user/sync', {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      const json = await res.json();
      if (json.success && json.data) {
        let changed = false;
        if (json.data.mealPlan) {
          state.mealPlan = json.data.mealPlan;
          localStorage.setItem('freshplate_mealplan', JSON.stringify(state.mealPlan));
          changed = true;
        }
        if (json.data.savedRecipes && Array.isArray(json.data.savedRecipes)) {
          state.savedRecipeIds = new Set(json.data.savedRecipes);
          localStorage.setItem('freshplate_saved', JSON.stringify(Array.from(state.savedRecipeIds)));
          changed = true;
        }
        if (changed) {
          renderWeeklyTable();
          renderDaySelectorPills();
          renderRecipeGrid();
          updateTotalMealCountBadge();
          updateNutritionSummary();
        }
      }
    } catch (err) {
      console.warn('Sync from server error:', err);
    }
  }

  function updateSupabaseHeaderStatus() {
    if (!headerSupabaseDot) return;
    if (window.SupabaseService && window.SupabaseService.isConfigured()) {
      headerSupabaseDot.classList.add('connected');
      headerSupabaseDot.title = 'เชื่อมต่อกับ Supabase เรียบร้อยแล้ว (Cloud PostgreSQL & Auth พร้อมใช้งาน)';
    } else {
      headerSupabaseDot.classList.remove('connected');
      headerSupabaseDot.title = 'ยังไม่ได้ใส่ Supabase Config (คลิกเพื่อตั้งค่า)';
    }
  }

  async function handleSupabaseUser(sbUser) {
    if (!sbUser) {
      if (state.isSupabaseUser) {
        state.currentUser = null;
        state.isSupabaseUser = false;
        renderUserHeader();
      }
      return;
    }

    console.log('⚡ Supabase Auth State: Logged in as', sbUser.email);
    state.isSupabaseUser = true;

    // Fetch or create profile in Supabase public.users table
    let profile = null;
    try {
      profile = await window.SupabaseService.getUserProfile(sbUser.id);
    } catch (e) {
      console.warn('Could not read Supabase profile:', e);
    }

    const meta = sbUser.user_metadata || {};
    const isUserAdmin = sbUser.email && (sbUser.email.toLowerCase().includes('admin') || sbUser.email === 'admin@freshplate.com');

    if (!profile) {
      profile = {
        name: meta.full_name || meta.name || (sbUser.email ? sbUser.email.split('@')[0] : 'ผู้ใช้งาน Supabase'),
        email: sbUser.email || '',
        photoURL: meta.avatar_url || '',
        role: isUserAdmin ? 'admin' : 'user',
        target_calories: 2000,
        target_protein: 130,
        target_carbs: 210,
        target_fat: 65,
        health_goal: 'ทานคลีนรักษาสุขภาพทั่วไป'
      };
      try {
        await window.SupabaseService.setUserProfile(sbUser.id, profile);
      } catch (e) {}
    }

    state.currentUser = {
      id: sbUser.id,
      uid: sbUser.id,
      name: profile.name || meta.full_name || 'ผู้ใช้งาน Supabase',
      email: profile.email || sbUser.email,
      photoURL: profile.photo_url || profile.photoURL || meta.avatar_url || '',
      role: profile.role || (isUserAdmin ? 'admin' : 'user'),
      target_calories: profile.target_calories || 2000,
      target_protein: profile.target_protein || 130,
      target_carbs: profile.target_carbs || 210,
      target_fat: profile.target_fat || 65,
      health_goal: profile.health_goal || 'ทานคลีนรักษาสุขภาพทั่วไป'
    };

    if (state.currentUser.target_calories) DEFAULT_NUTRITION_TARGET.calories = state.currentUser.target_calories;
    if (state.currentUser.target_protein) DEFAULT_NUTRITION_TARGET.protein = state.currentUser.target_protein;
    if (state.currentUser.target_carbs) DEFAULT_NUTRITION_TARGET.carbs = state.currentUser.target_carbs;
    if (state.currentUser.target_fat) DEFAULT_NUTRITION_TARGET.fat = state.currentUser.target_fat;

    // Sync meal data from Supabase
    await syncUserDataFromServer();

    renderUserHeader();
    updateNutritionSummary();
  }

  function setupSupabaseAuthListener() {
    if (!window.SupabaseService || !window.SupabaseService.isConfigured()) return;
    updateSupabaseHeaderStatus();

    const client = window.SupabaseService.getClient();
    if (!client) return;

    // Check existing session
    client.auth.getSession().then(({ data }) => {
      if (data && data.session && data.session.user) {
        handleSupabaseUser(data.session.user);
      }
    }).catch(err => {
      console.warn('Error checking Supabase session:', err);
    });

    // Listen for auth events (sign in, sign out, token refreshed)
    try {
      client.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
          await handleSupabaseUser(session.user);
        } else if (event === 'SIGNED_OUT') {
          if (state.isSupabaseUser) {
            state.currentUser = null;
            state.isSupabaseUser = false;
            renderUserHeader();
          }
        }
      });
    } catch (e) {
      console.warn('Could not register Supabase auth listener:', e);
    }
  }

  async function checkAuthStatus() {
    updateSupabaseHeaderStatus();

    // Check Supabase Auth first if available
    if (window.SupabaseService && window.SupabaseService.isConfigured()) {
      setupSupabaseAuthListener();
    }

    state.authToken = localStorage.getItem('freshplate_token') || sessionStorage.getItem('freshplate_token') || null;

    if (!state.authToken) {
      renderUserHeader();
      return;
    }

    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      const data = await res.json();
      if (data.success && data.user) {
        state.currentUser = data.user;
        state.isSupabaseUser = false;
        if (state.currentUser.target_calories) {
          DEFAULT_NUTRITION_TARGET.calories = state.currentUser.target_calories;
        }
        if (state.currentUser.target_protein) {
          DEFAULT_NUTRITION_TARGET.protein = state.currentUser.target_protein;
        }
        if (state.currentUser.target_carbs) {
          DEFAULT_NUTRITION_TARGET.carbs = state.currentUser.target_carbs;
        }
        if (state.currentUser.target_fat) {
          DEFAULT_NUTRITION_TARGET.fat = state.currentUser.target_fat;
        }
        await syncUserDataFromServer();
      } else {
        // Token expired or invalid
        state.authToken = null;
        localStorage.removeItem('freshplate_token');
        sessionStorage.removeItem('freshplate_token');
        state.currentUser = null;
      }
    } catch (err) {
      console.warn('Check SQLite auth note (server may be offline):', err.message);
    }
    renderUserHeader();
    updateNutritionSummary();
  }

  function renderUserHeader() {
    if (!state.currentUser) {
      // Guest state
      userAccountArea.innerHTML = `
        <button class="btn-header-auth btn-login" id="btnOpenLogin">เข้าสู่ระบบ</button>
        <button class="btn-header-auth btn-register" id="btnOpenRegister">สมัครสมาชิก</button>
      `;

      document.getElementById('btnOpenLogin').addEventListener('click', () => openAuthModal('login'));
      document.getElementById('btnOpenRegister').addEventListener('click', () => openAuthModal('register'));
    } else {
      // Logged-in state (User or Admin)
      const user = state.currentUser;
      const isAdmin = user.role === 'admin';

      userAccountArea.innerHTML = `
        <div class="user-profile-dropdown-wrapper">
          <button class="user-profile-btn" id="btnUserDropdownToggle" aria-haspopup="true" aria-expanded="false" title="จัดการบัญชี">
            <div class="user-avatar-circle ${isAdmin ? 'user-avatar-admin' : ''}">
              ${user.photoURL ? `<img src="${escapeHtml(user.photoURL)}" class="user-avatar-img" alt="${escapeHtml(user.name)}" referrerpolicy="no-referrer">` : (isAdmin ? '👑' : '🌱')}
            </div>
            <div class="user-pill-info">
              <span class="user-pill-name">${escapeHtml(user.name)}</span>
              <span class="user-pill-role ${isAdmin ? 'admin' : ''}">
                ${isAdmin ? 'ผู้ดูแล / นักโภชนาการ' : `เป้าหมาย ${user.target_calories || 2000} kcal`}
              </span>
            </div>
            <span style="font-size:0.75rem; color:var(--text-light); margin-left:2px;">▾</span>
          </button>

          <!-- User Dropdown Menu Popover -->
          <div class="user-dropdown-menu" id="userDropdownMenu" role="menu">
            <div class="user-dropdown-header">
              <div class="dropdown-user-name">${escapeHtml(user.name)}</div>
              <div class="dropdown-user-email">${escapeHtml(user.email)}</div>
              <span class="dropdown-user-badge ${isAdmin ? 'admin' : ''}">
                ${isAdmin ? '🛡️ ผู้ดูแลระบบ / Admin' : '🌿 สมาชิกทั่วไป'}
              </span>
            </div>

            <button class="user-dropdown-item" id="menuItemProfile" role="menuitem">
              <span>⚙️</span> โปรไฟล์ & เป้าหมายโภชนาการ
            </button>
            ${state.isSupabaseUser ? '' : `
            <button class="user-dropdown-item" id="menuItemChangePw" role="menuitem">
              <span>🔑</span> เปลี่ยนรหัสผ่าน
            </button>`}
            <button class="user-dropdown-item" id="menuItemConsult" role="menuitem">
              <span>💬</span> ปรึกษาโภชนาการ
            </button>
            ${isAdmin ? `
            <button class="user-dropdown-item" id="menuItemAdmin" role="menuitem">
              <span>🛡️</span> แดชบอร์ดผู้ดูแลระบบ
            </button>` : ''}

            <div class="user-dropdown-divider"></div>
            <button class="user-dropdown-item danger" id="menuItemLogout" role="menuitem">
              <span>🚪</span> ออกจากระบบ
            </button>
          </div>
        </div>
      `;

      // Setup dropdown handlers
      const btnToggle = document.getElementById('btnUserDropdownToggle');
      const menu = document.getElementById('userDropdownMenu');

      btnToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        menu.classList.toggle('open', !isOpen);
        btnToggle.setAttribute('aria-expanded', !isOpen);
      });

      document.getElementById('menuItemProfile').addEventListener('click', () => {
        menu.classList.remove('open');
        openProfileModal();
      });

      const changePwItem = document.getElementById('menuItemChangePw');
      if (changePwItem) {
        changePwItem.addEventListener('click', () => {
          menu.classList.remove('open');
          openChangePasswordModal();
        });
      }

      document.getElementById('menuItemConsult').addEventListener('click', () => {
        menu.classList.remove('open');
        openConsultationModal();
      });

      if (isAdmin) {
        document.getElementById('menuItemAdmin').addEventListener('click', () => {
          menu.classList.remove('open');
          openAdminDashboard();
        });
      }

      document.getElementById('menuItemLogout').addEventListener('click', () => {
        menu.classList.remove('open');
        handleLogout();
      });
    }
  }

  // Close dropdown on window click
  document.addEventListener('click', (e) => {
    const menu = document.getElementById('userDropdownMenu');
    if (menu && menu.classList.contains('open') && !e.target.closest('.user-profile-dropdown-wrapper')) {
      menu.classList.remove('open');
    }
  });

  // Show/Hide Password Eye Toggles
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-toggle-pw');
    if (!btn) return;
    const targetId = btn.getAttribute('data-target');
    const input = document.getElementById(targetId);
    if (!input) return;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  });

  // Password Strength Calculator for Register
  const regPasswordInput = document.getElementById('regPassword');
  if (regPasswordInput) {
    regPasswordInput.addEventListener('input', (e) => {
      const val = e.target.value;
      const fill = document.getElementById('pwStrengthFill');
      const text = document.getElementById('pwStrengthText');
      if (!fill || !text) return;
      if (!val) {
        fill.style.width = '0%';
        fill.style.backgroundColor = '#E5E7EB';
        text.textContent = 'ความปลอดภัยรหัสผ่าน';
        text.style.color = 'var(--text-light)';
        return;
      }
      let score = 0;
      if (val.length >= 6) score += 30;
      if (val.length >= 10) score += 20;
      if (/\d/.test(val)) score += 25;
      if (/[A-Z]/.test(val) || /[^A-Za-z0-9]/.test(val)) score += 25;

      fill.style.width = `${Math.min(100, score)}%`;
      if (score < 40) {
        fill.style.backgroundColor = '#EF4444';
        text.textContent = 'รหัสผ่านสั้น หรือคาดเดาง่าย';
        text.style.color = '#EF4444';
      } else if (score < 75) {
        fill.style.backgroundColor = '#F59E0B';
        text.textContent = 'ความปลอดภัย: ปานกลาง';
        text.style.color = '#D97706';
      } else {
        fill.style.backgroundColor = '#10B981';
        text.textContent = 'ความปลอดภัย: สูงเยี่ยม ✨';
        text.style.color = '#059669';
      }
    });
  }

  function openAuthModal(initialTab = 'login') {
    hideAuthAlert('authAlertBox');
    switchAuthTab(initialTab);
    authModalBackdrop.classList.add('open');
  }

  function closeAuthModal() {
    authModalBackdrop.classList.remove('open');
    hideAuthAlert('authAlertBox');
  }

  function switchAuthTab(tab) {
    const tabLogin = document.getElementById('tabAuthLogin');
    const tabRegister = document.getElementById('tabAuthRegister');
    const formLogin = document.getElementById('formLogin');
    const formRegister = document.getElementById('formRegister');
    const title = document.getElementById('authModalTitle');
    hideAuthAlert('authAlertBox');

    if (tab === 'login') {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      formLogin.style.display = 'block';
      formRegister.style.display = 'none';
      title.innerHTML = '<span>🌿</span> เข้าสู่ระบบ FreshPlate';
    } else {
      tabLogin.classList.remove('active');
      tabRegister.classList.add('active');
      formLogin.style.display = 'none';
      formRegister.style.display = 'block';
      title.innerHTML = '<span>🌱</span> สมัครสมาชิก FreshPlate';
    }
  }

  document.getElementById('tabAuthLogin').addEventListener('click', () => switchAuthTab('login'));
  document.getElementById('tabAuthRegister').addEventListener('click', () => switchAuthTab('register'));
  document.getElementById('btnCloseAuthModal').addEventListener('click', closeAuthModal);

  // Google Sign In & Sign Up Handlers (via Supabase OAuth)
  async function handleGoogleAuthClick() {
    hideAuthAlert('authAlertBox');

    if (!window.SupabaseService || !window.SupabaseService.isConfigured()) {
      openSupabaseModal();
      showAuthAlert('supabaseAlertBox', 'error', 'กรุณาใส่ Supabase Config (URL & Key) ก่อนเพื่อเปิดใช้งาน Google Login และ Supabase PostgreSQL ค่ะ');
      return;
    }

    try {
      showToast('กำลังเชื่อมต่อไปยัง Google ผ่าน Supabase OAuth...', '⏳', 4000);
      await window.SupabaseService.signInWithGoogle();
      closeAuthModal();
    } catch (err) {
      console.error('Google sign in error:', err);
      if (err.message === 'CONFIG_REQUIRED') {
        openSupabaseModal();
        showAuthAlert('supabaseAlertBox', 'error', 'กรุณาระบุ Supabase URL และ Key ให้ครบถ้วนก่อนค่ะ');
      } else {
        showAuthAlert('authAlertBox', 'error', 'การเข้าสู่ระบบด้วย Google ไม่สำเร็จ: ' + (err.message || err));
      }
    }
  }

  if (btnGoogleLogin) {
    btnGoogleLogin.addEventListener('click', handleGoogleAuthClick);
  }
  if (btnGoogleRegister) {
    btnGoogleRegister.addEventListener('click', handleGoogleAuthClick);
  }

  // Form: Login
  document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAuthAlert('authAlertBox');

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;
    const rememberMe = document.getElementById('loginRememberMe') ? document.getElementById('loginRememberMe').checked : true;
    const submitBtn = document.getElementById('btnLoginSubmit');

    if (!email || !password) {
      showAuthAlert('authAlertBox', 'error', 'กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }

    setButtonLoading(submitBtn, true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      setButtonLoading(submitBtn, false, 'เข้าสู่ระบบ 🚀');

      if (data.success) {
        state.authToken = data.token;
        if (rememberMe) {
          localStorage.setItem('freshplate_token', data.token);
          sessionStorage.removeItem('freshplate_token');
        } else {
          sessionStorage.setItem('freshplate_token', data.token);
          localStorage.removeItem('freshplate_token');
        }
        state.currentUser = data.user;

        if (data.user.target_calories) {
          DEFAULT_NUTRITION_TARGET.calories = data.user.target_calories;
        }
        if (data.user.target_protein) {
          DEFAULT_NUTRITION_TARGET.protein = data.user.target_protein;
        }
        if (data.user.target_carbs) {
          DEFAULT_NUTRITION_TARGET.carbs = data.user.target_carbs;
        }
        if (data.user.target_fat) {
          DEFAULT_NUTRITION_TARGET.fat = data.user.target_fat;
        }

        await syncUserDataFromServer();

        closeAuthModal();
        renderUserHeader();
        updateNutritionSummary();
        showToast(data.message, '👋');
      } else {
        showAuthAlert('authAlertBox', 'error', data.message || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
      }
    } catch (err) {
      setButtonLoading(submitBtn, false, 'เข้าสู่ระบบ 🚀');
      showAuthAlert('authAlertBox', 'error', 'ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้ กรุณาลองใหม่อีกครั้ง');
    }
  });

  // Form: Register
  document.getElementById('formRegister').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideAuthAlert('authAlertBox');

    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const passwordConfirm = document.getElementById('regPasswordConfirm').value;
    const target_calories = parseInt(document.getElementById('regTargetCalories').value) || 2000;
    const health_goal = document.getElementById('regGoal').value;
    const submitBtn = document.getElementById('btnRegisterSubmit');

    if (!name || !email || !password) {
      showAuthAlert('authAlertBox', 'error', 'กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }

    if (password.length < 6) {
      showAuthAlert('authAlertBox', 'error', 'รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (password !== passwordConfirm) {
      showAuthAlert('authAlertBox', 'error', 'รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }

    setButtonLoading(submitBtn, true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, target_calories, health_goal })
      });
      const data = await res.json();
      setButtonLoading(submitBtn, false, 'สร้างบัญชีสมาชิกฟรี 🌱');

      if (data.success) {
        state.authToken = data.token;
        localStorage.setItem('freshplate_token', data.token);
        state.currentUser = data.user;
        DEFAULT_NUTRITION_TARGET.calories = target_calories;

        // Auto sync new registered user profile to Supabase
        if (window.SupabaseService && window.SupabaseService.isConfigured()) {
          try {
            await window.SupabaseService.setUserProfile(data.user.id, data.user);
            console.log('⚡ User profile saved to Supabase');
          } catch (e) {}
        }

        // Auto sync current state to server for new user
        syncUserDataToServer();

        closeAuthModal();
        renderUserHeader();
        updateNutritionSummary();
        showToast(`ยินดีต้อนรับคุณ ${data.user.name} สู่ FreshPlate! 🎉`, '✨');
      } else {
        showAuthAlert('authAlertBox', 'error', data.message || 'การสมัครสมาชิกไม่สำเร็จ');
      }
    } catch (err) {
      setButtonLoading(submitBtn, false, 'สร้างบัญชีสมาชิกฟรี 🌱');
      showAuthAlert('authAlertBox', 'error', 'เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
    }
  });

  // Demo Quick Logins
  document.getElementById('btnQuickLoginAdmin').addEventListener('click', async () => {
    document.getElementById('loginEmail').value = 'admin@freshplate.com';
    document.getElementById('loginPassword').value = 'admin1234';
    document.getElementById('formLogin').dispatchEvent(new Event('submit'));
  });

  document.getElementById('btnQuickLoginUser').addEventListener('click', async () => {
    document.getElementById('loginEmail').value = 'user@freshplate.com';
    document.getElementById('loginPassword').value = 'user1234';
    document.getElementById('formLogin').dispatchEvent(new Event('submit'));
  });

  // Forgot Password / Assistant Modal
  document.getElementById('btnOpenForgotModal').addEventListener('click', () => {
    forgotModalBackdrop.classList.add('open');
  });

  document.getElementById('btnCloseForgotModal').addEventListener('click', () => {
    forgotModalBackdrop.classList.remove('open');
  });

  document.getElementById('btnFillForgotUser').addEventListener('click', () => {
    forgotModalBackdrop.classList.remove('open');
    switchAuthTab('login');
    document.getElementById('loginEmail').value = 'user@freshplate.com';
    document.getElementById('loginPassword').value = 'user1234';
    document.getElementById('formLogin').dispatchEvent(new Event('submit'));
  });

  // Profile Modal: Open & Save
  function openProfileModal() {
    if (!state.currentUser) return;
    const user = state.currentUser;
    hideAuthAlert('profileAlertBox');

    if (user.photoURL) {
      document.getElementById('profileAvatarBig').innerHTML = `<img src="${escapeHtml(user.photoURL)}" class="profile-avatar-big-img" alt="${escapeHtml(user.name)}" referrerpolicy="no-referrer">`;
    } else {
      document.getElementById('profileAvatarBig').textContent = user.role === 'admin' ? '👑' : '🌱';
    }
    document.getElementById('profileDisplayName').textContent = user.name;
    document.getElementById('profileDisplayEmail').textContent = user.email;
    const roleBadge = document.getElementById('profileDisplayRole');
    roleBadge.textContent = user.role === 'admin' ? 'ผู้ดูแลระบบ / โค้ชโภชนาการ' : 'สมาชิกทั่วไป';
    roleBadge.className = `profile-role-badge ${user.role === 'admin' ? 'admin' : ''}`;

    document.getElementById('editProfName').value = user.name || '';
    document.getElementById('editProfGoal').value = user.health_goal || 'ทานคลีนรักษาสุขภาพทั่วไป';
    document.getElementById('editProfCalories').value = user.target_calories || 2000;
    document.getElementById('editProfProtein').value = user.target_protein || 130;
    document.getElementById('editProfCarbs').value = user.target_carbs || 210;
    document.getElementById('editProfFat').value = user.target_fat || 65;

    profileModalBackdrop.classList.add('open');
  }

  function closeProfileModal() {
    profileModalBackdrop.classList.remove('open');
    hideAuthAlert('profileAlertBox');
  }

  document.getElementById('btnCloseProfileModal').addEventListener('click', closeProfileModal);
  document.getElementById('btnCancelProfileEdit').addEventListener('click', closeProfileModal);

  document.getElementById('formEditProfile').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.currentUser) return;
    hideAuthAlert('profileAlertBox');

    const name = document.getElementById('editProfName').value.trim();
    const health_goal = document.getElementById('editProfGoal').value;
    const target_calories = parseInt(document.getElementById('editProfCalories').value) || 2000;
    const target_protein = parseInt(document.getElementById('editProfProtein').value) || 130;
    const target_carbs = parseInt(document.getElementById('editProfCarbs').value) || 210;
    const target_fat = parseInt(document.getElementById('editProfFat').value) || 65;
    const saveBtn = document.getElementById('btnSaveProfile');

    setButtonLoading(saveBtn, true);

    // 1. If signed in with Supabase
    if (state.isSupabaseUser && window.SupabaseService) {
      try {
        const updateData = {
          name,
          health_goal,
          target_calories,
          target_protein,
          target_carbs,
          target_fat
        };
        await window.SupabaseService.setUserProfile(state.currentUser.uid || state.currentUser.id, updateData);
        state.currentUser = { ...state.currentUser, ...updateData };
        DEFAULT_NUTRITION_TARGET.calories = target_calories;
        DEFAULT_NUTRITION_TARGET.protein = target_protein;
        DEFAULT_NUTRITION_TARGET.carbs = target_carbs;
        DEFAULT_NUTRITION_TARGET.fat = target_fat;

        setButtonLoading(saveBtn, false, 'บันทึกข้อมูล ✨');
        renderUserHeader();
        updateNutritionSummary();
        closeProfileModal();
        showToast('อัปเดตข้อมูลบน Supabase PostgreSQL เรียบร้อยแล้ว! 🎯', '⚡');
        return;
      } catch (err) {
        setButtonLoading(saveBtn, false, 'บันทึกข้อมูล ✨');
        showAuthAlert('profileAlertBox', 'error', 'เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + err.message);
        return;
      }
    }

    // 2. If SQLite Token
    if (!state.authToken) {
      setButtonLoading(saveBtn, false, 'บันทึกข้อมูล ✨');
      return;
    }

    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({
          name,
          health_goal,
          target_calories,
          target_protein,
          target_carbs,
          target_fat
        })
      });
      const data = await res.json();
      setButtonLoading(saveBtn, false, 'บันทึกข้อมูล ✨');

      if (data.success && data.user) {
        state.currentUser = data.user;
        DEFAULT_NUTRITION_TARGET.calories = target_calories;
        DEFAULT_NUTRITION_TARGET.protein = target_protein;
        DEFAULT_NUTRITION_TARGET.carbs = target_carbs;
        DEFAULT_NUTRITION_TARGET.fat = target_fat;

        renderUserHeader();
        updateNutritionSummary();
        closeProfileModal();
        showToast('อัปเดตโปรไฟล์และเป้าหมายโภชนาการเรียบร้อยแล้ว!', '🎯');

        // Also mirror update to Supabase
        if (window.SupabaseService && window.SupabaseService.isConfigured()) {
          try {
            await window.SupabaseService.setUserProfile(data.user.id, data.user);
          } catch (e) {}
        }
      } else {
        showAuthAlert('profileAlertBox', 'error', data.message || 'บันทึกข้อมูลไม่สำเร็จ');
      }
    } catch (err) {
      setButtonLoading(saveBtn, false, 'บันทึกข้อมูล ✨');
      showAuthAlert('profileAlertBox', 'error', 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  });

  // Change Password Modal: Open & Submit
  function openChangePasswordModal() {
    if (!state.currentUser) return;
    hideAuthAlert('changePwAlertBox');
    document.getElementById('formChangePassword').reset();
    changePasswordModalBackdrop.classList.add('open');
  }

  function closeChangePasswordModal() {
    changePasswordModalBackdrop.classList.remove('open');
    hideAuthAlert('changePwAlertBox');
  }

  document.getElementById('btnCloseChangePwModal').addEventListener('click', closeChangePasswordModal);

  document.getElementById('formChangePassword').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.authToken) return;
    hideAuthAlert('changePwAlertBox');

    const currentPassword = document.getElementById('currPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const newPasswordConfirm = document.getElementById('newPasswordConfirm').value;
    const submitBtn = document.getElementById('btnChangePwSubmit');

    if (!currentPassword || !newPassword) {
      showAuthAlert('changePwAlertBox', 'error', 'กรุณากรอกรหัสผ่านให้ครบถ้วน');
      return;
    }

    if (newPassword.length < 6) {
      showAuthAlert('changePwAlertBox', 'error', 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร');
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      showAuthAlert('changePwAlertBox', 'error', 'รหัสผ่านใหม่และการยืนยันไม่ตรงกัน');
      return;
    }

    setButtonLoading(submitBtn, true);

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      const data = await res.json();
      setButtonLoading(submitBtn, false, 'อัปเดตรหัสผ่านใหม่ 🔒');

      if (data.success) {
        closeChangePasswordModal();
        showToast('เปลี่ยนรหัสผ่านเรียบร้อยแล้ว!', '🔑');
      } else {
        showAuthAlert('changePwAlertBox', 'error', data.message || 'ไม่สามารถเปลี่ยนรหัสผ่านได้');
      }
    } catch (err) {
      setButtonLoading(submitBtn, false, 'อัปเดตรหัสผ่านใหม่ 🔒');
      showAuthAlert('changePwAlertBox', 'error', 'เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  });

  async function handleLogout() {
    if (window.SupabaseService) {
      try {
        await window.SupabaseService.signOut();
      } catch (e) {}
    }
    if (state.authToken) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${state.authToken}` }
        });
      } catch (e) {}
    }
    state.authToken = null;
    state.currentUser = null;
    state.isSupabaseUser = false;
    localStorage.removeItem('freshplate_token');
    sessionStorage.removeItem('freshplate_token');
    renderUserHeader();
    showToast('ออกจากระบบเรียบร้อยแล้ว', '👋');
  }

  // =========================================================================
  // 5. USER CONSULTATION SYSTEM (ปรึกษาโภชนาการสำหรับ User)
  // =========================================================================
  function openConsultationModal() {
    if (!state.currentUser) {
      openAuthModal('login');
      return;
    }
    document.getElementById('consultHealthGoal').value = state.currentUser.health_goal || '';
    switchConsultTab('new');
    loadUserConsultations();
    consultationModalBackdrop.classList.add('open');
  }

  function closeConsultationModal() {
    consultationModalBackdrop.classList.remove('open');
  }

  function switchConsultTab(tab) {
    const tabNew = document.getElementById('tabConsultNew');
    const tabHistory = document.getElementById('tabConsultHistory');
    const formNew = document.getElementById('formNewConsultation');
    const historyList = document.getElementById('consultationHistoryList');

    if (tab === 'new') {
      tabNew.classList.add('active');
      tabHistory.classList.remove('active');
      formNew.style.display = 'block';
      historyList.style.display = 'none';
    } else {
      tabNew.classList.remove('active');
      tabHistory.classList.add('active');
      formNew.style.display = 'none';
      historyList.style.display = 'block';
      loadUserConsultations();
    }
  }

  document.getElementById('tabConsultNew').addEventListener('click', () => switchConsultTab('new'));
  document.getElementById('tabConsultHistory').addEventListener('click', () => switchConsultTab('history'));
  document.getElementById('btnCloseConsultModal').addEventListener('click', closeConsultationModal);

  async function loadUserConsultations() {
    if (!state.currentUser) return;

    // 1. Fetch from Supabase PostgreSQL if using Supabase
    if (state.isSupabaseUser && window.SupabaseService) {
      try {
        const items = await window.SupabaseService.getUserConsultations(state.currentUser.uid || state.currentUser.id);
        state.userConsultations = items;
        document.getElementById('userConsultCount').textContent = items.length;
        renderUserConsultationHistory(items);
      } catch (err) {
        console.error('Error fetching Supabase consultations:', err);
      }
      return;
    }

    // 2. Fetch from SQLite Backend
    if (!state.authToken) return;
    try {
      const res = await fetch('/api/consultations/my', {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      const data = await res.json();
      if (data.success) {
        state.userConsultations = data.consultations;
        document.getElementById('userConsultCount').textContent = data.consultations.length;
        renderUserConsultationHistory(data.consultations);
      }
    } catch (err) {
      console.error('Error fetching consultations:', err);
    }
  }

  function renderUserConsultationHistory(items) {
    const container = document.getElementById('consultationHistoryList');
    if (!items || items.length === 0) {
      container.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
          <div style="font-size:2.2rem; margin-bottom:8px;">💬</div>
          <h4>ยังไม่มีประวัติคำปรึกษา</h4>
          <p style="font-size:0.85rem;">พิมพ์ส่งคำถามแรกของคุณในแท็บ "ส่งคำถามใหม่" ได้เลยค่ะ</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(item => {
      const isAnswered = item.status === 'answered';
      let repliedDateStr = '';
      if (item.replied_at) {
        try {
          const d = item.replied_at.toDate ? item.replied_at.toDate() : new Date(item.replied_at);
          repliedDateStr = d.toLocaleDateString('th-TH');
        } catch (e) {
          repliedDateStr = '';
        }
      }

      return `
        <div class="consult-card">
          <div class="consult-header-row">
            <h4 class="consult-subject">${escapeHtml(item.subject)}</h4>
            <span class="consult-badge ${isAnswered ? 'consult-answered' : 'consult-pending'}">
              ${isAnswered ? '✅ ได้รับคำแนะนำแล้ว' : '⏳ รอคำแนะนำ'}
            </span>
          </div>
          ${item.health_goal ? `<div style="font-size:0.75rem; color:var(--orange-700); margin-bottom:6px; font-weight:700;">🎯 เป้าหมาย: ${escapeHtml(item.health_goal)}</div>` : ''}
          <div class="consult-question-text">
            <strong>คำถามของคุณ:</strong><br>${escapeHtml(item.question)}
          </div>

          ${isAnswered ? `
            <div class="consult-reply-box">
              <div class="reply-author">
                <span>👑</span> คำแนะนำจาก ${escapeHtml(item.admin_name || 'ผู้เชี่ยวชาญ / Admin')}:
              </div>
              <div class="reply-text">${escapeHtml(item.admin_reply)}</div>
              ${repliedDateStr ? `<div class="reply-date">ตอบเมื่อ: ${repliedDateStr}</div>` : ''}
            </div>
          ` : `
            <div style="font-size:0.8rem; color:var(--text-light); font-style:italic;">
              ⏳ นักโภชนาการกำลังตรวจสอบคำถามของคุณ และจะตอบกลับที่นี่เร็วๆ นี้
            </div>
          `}
        </div>
      `;
    }).join('');
  }

  document.getElementById('formNewConsultation').addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.currentUser) return;

    const subject = document.getElementById('consultSubject').value.trim();
    const health_goal = document.getElementById('consultHealthGoal').value;
    const question = document.getElementById('consultQuestion').value.trim();

    if (!subject || !question) {
      showToast('กรุณากรอกหัวข้อและคำถามให้ครบถ้วน', '⚠️');
      return;
    }

    // 1. Submit to Supabase PostgreSQL
    if (state.isSupabaseUser && window.SupabaseService) {
      try {
        const result = await window.SupabaseService.submitConsultation({
          userId: state.currentUser.uid || state.currentUser.id,
          userName: state.currentUser.name,
          userEmail: state.currentUser.email,
          userPhoto: state.currentUser.photoURL || state.currentUser.photo_url || '',
          userTargetCal: state.currentUser.target_calories || 2000,
          subject,
          health_goal,
          question
        });
        if (result.success) {
          showToast(result.message, '🌿');
          document.getElementById('consultSubject').value = '';
          document.getElementById('consultQuestion').value = '';
          switchConsultTab('history');
        } else {
          showToast(result.message || 'ไม่สามารถส่งคำถามได้', '⚠️');
        }
      } catch (err) {
        showToast('เกิดข้อผิดพลาดในการส่งคำถาม: ' + err.message, '❌');
      }
      return;
    }

    // 2. Submit to SQLite Server
    if (!state.authToken) return;
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({ subject, health_goal, question })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.message, '📨');
        document.getElementById('consultSubject').value = '';
        document.getElementById('consultQuestion').value = '';
        switchConsultTab('history');
      } else {
        showToast(data.message || 'ไม่สามารถส่งคำถามได้', '⚠️');
      }
    } catch (err) {
      showToast('เกิดข้อผิดพลาดในการส่งคำถาม', '❌');
    }
  });

  // =========================================================================
  // 6. ADMIN DASHBOARD & ADVICE SYSTEM (ระบบ Admin ตอบคำถาม)
  // =========================================================================
  function openAdminDashboard() {
    if (!state.currentUser || state.currentUser.role !== 'admin') {
      showToast('หน้านี้สำหรับผู้ดูแลระบบเท่านั้น', '🔒');
      return;
    }

    switchAdminTab('queue');
    loadAdminStats();
    loadAdminConsultations();
    adminDashboardModalBackdrop.classList.add('open');
  }

  function closeAdminDashboard() {
    adminDashboardModalBackdrop.classList.remove('open');
  }

  function switchAdminTab(tab) {
    const tabQueue = document.getElementById('tabAdminQueue');
    const tabUserDir = document.getElementById('tabAdminUserDir');
    const queueSection = document.getElementById('adminQueueSection');
    const userDirSection = document.getElementById('adminUserDirSection');

    if (tab === 'queue') {
      tabQueue.classList.add('active');
      tabUserDir.classList.remove('active');
      queueSection.style.display = 'block';
      userDirSection.style.display = 'none';
      loadAdminConsultations();
    } else {
      tabQueue.classList.remove('active');
      tabUserDir.classList.add('active');
      queueSection.style.display = 'none';
      userDirSection.style.display = 'block';
      loadAdminUserDirectory();
    }
  }

  document.getElementById('tabAdminQueue').addEventListener('click', () => switchAdminTab('queue'));
  document.getElementById('tabAdminUserDir').addEventListener('click', () => switchAdminTab('userdir'));
  document.getElementById('btnCloseAdminModal').addEventListener('click', closeAdminDashboard);

  async function loadAdminStats() {
    if (!state.currentUser) return;

    if (state.isSupabaseUser && window.SupabaseService) {
      try {
        const allConsults = await window.SupabaseService.getAdminConsultations('all');
        const allUsers = await window.SupabaseService.getAdminUsers();
        const pending = allConsults.filter(c => c.status !== 'answered').length;
        const answered = allConsults.filter(c => c.status === 'answered').length;

        document.getElementById('statTotalUsers').textContent = allUsers.length;
        document.getElementById('statTotalConsults').textContent = allConsults.length;
        document.getElementById('statPendingConsults').textContent = pending;
        document.getElementById('statAnsweredConsults').textContent = answered;
      } catch (e) {}
      return;
    }

    if (!state.authToken) return;
    try {
      const res = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      const data = await res.json();
      if (data.success && data.stats) {
        document.getElementById('statTotalUsers').textContent = data.stats.totalUsers;
        document.getElementById('statTotalConsults').textContent = data.stats.totalConsultations;
        document.getElementById('statPendingConsults').textContent = data.stats.pendingConsultations;
        document.getElementById('statAnsweredConsults').textContent = data.stats.answeredConsultations;
      }
    } catch (e) {}
  }

  async function loadAdminConsultations() {
    if (!state.currentUser) return;

    if (state.isSupabaseUser && window.SupabaseService) {
      try {
        const items = await window.SupabaseService.getAdminConsultations(state.adminFilter);
        state.adminConsultations = items;
        document.getElementById('adminQueueCount').textContent = items.length;
        renderAdminConsultationsList(items);
      } catch (e) {}
      return;
    }

    if (!state.authToken) return;
    try {
      const res = await fetch(`/api/admin/consultations?status=${state.adminFilter}`, {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      const data = await res.json();
      if (data.success) {
        state.adminConsultations = data.consultations;
        document.getElementById('adminQueueCount').textContent = data.consultations.length;
        renderAdminConsultationsList(data.consultations);
      }
    } catch (e) {}
  }

  function renderAdminConsultationsList(items) {
    const list = document.getElementById('adminConsultationsList');
    if (!items || items.length === 0) {
      list.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
          <div style="font-size:2rem; margin-bottom:8px;">🎉</div>
          <h4>ไม่มีคำถามในคิวสถานะนี้</h4>
          <p style="font-size:0.85rem;">คำถามจากผู้ใช้ทั้งหมดได้รับการตอบอย่างเรียบร้อยแล้ว</p>
        </div>
      `;
      return;
    }

    list.innerHTML = items.map(item => {
      const isAnswered = item.status === 'answered';
      const userName = item.user_name || item.userName || 'ผู้ใช้งาน';
      const userEmail = item.user_email || item.userEmail || '';
      const userCal = item.user_target_cal || item.userTargetCal || 2000;
      let repliedDateStr = '';
      if (item.replied_at) {
        try {
          const d = item.replied_at.toDate ? item.replied_at.toDate() : new Date(item.replied_at);
          repliedDateStr = d.toLocaleDateString('th-TH');
        } catch (e) {}
      }

      return `
        <div class="consult-card" data-consult-id="${item.id}">
          <div class="consult-header-row">
            <div>
              <h4 class="consult-subject">${escapeHtml(item.subject)}</h4>
              <div style="font-size:0.78rem; color:var(--text-muted); margin-top:2px;">
                ผู้ถาม: <strong>${escapeHtml(userName)}</strong> (${escapeHtml(userEmail)}) | เป้าหมาย: <strong>${userCal} kcal</strong>
              </div>
            </div>
            <span class="consult-badge ${isAnswered ? 'consult-answered' : 'consult-pending'}">
              ${isAnswered ? '✅ ตอบแล้ว' : '⏳ รอคำตอบ'}
            </span>
          </div>

          ${item.health_goal ? `<div style="font-size:0.75rem; color:var(--orange-700); margin-bottom:6px; font-weight:700;">🎯 เป้าหมายสุขภาพ: ${escapeHtml(item.health_goal)}</div>` : ''}

          <div class="consult-question-text">
            ${escapeHtml(item.question)}
          </div>

          ${isAnswered ? `
            <div class="consult-reply-box" style="margin-bottom:10px;">
              <div class="reply-author">
                <span>👑</span> คำแนะนำที่คุณส่งให้ผู้ใช้:
              </div>
              <div class="reply-text">${escapeHtml(item.admin_reply)}</div>
              ${repliedDateStr ? `<div class="reply-date">ตอบเมื่อ: ${repliedDateStr}</div>` : ''}
            </div>
          ` : ''}

          <!-- Admin Reply Form -->
          <div style="margin-top:12px; padding-top:12px; border-top:1px dashed var(--border-subtle);">
            <div style="font-size:0.82rem; font-weight:700; color:var(--text-main); margin-bottom:6px;">
              ${isAnswered ? '✏️ แก้ไขหรือส่งคำแนะนำเพิ่มเติม:' : '✍️ พิมพ์คำแนะนำสำหรับผู้ใช้งานคนนี้:'}
            </div>

            <!-- Quick Template Chips -->
            <div class="quick-template-chips">
              <span style="font-size:0.72rem; color:var(--text-light); align-self:center;">ตัวช่วยตอบด่วน:</span>
              <button type="button" class="template-chip-btn" data-target-id="${item.id}" data-text="สวัสดีค่ะ แนะนำให้เน้นแหล่งโปรตีนสะอาด เช่น อกไก่ย่าง หรือแซลมอน และดื่มน้ำอย่างน้อย 2-2.5 ลิตรต่อวันค่ะ">
                + แนะนำโปรตีน
              </button>
              <button type="button" class="template-chip-btn" data-target-id="${item.id}" data-text="แนะนำให้ปรับลดคาร์โบไฮเดรตในมื้อเย็นลงครึ่งหนึ่ง และเปลี่ยนเป็นควินัวหรือข้าวไรซ์เบอร์รี่เพื่อช่วยคุมระดับน้ำตาลค่ะ">
                + ปรับลดคาร์บมื้อเย็น
              </button>
              <button type="button" class="template-chip-btn" data-target-id="${item.id}" data-text="สามารถจัดมื้อว่างเป็นกรีกโยเกิร์ตคู่เบอร์รี่รวมสด จะช่วยให้อิ่มท้องนานและไม่หลุดเป้าหมายแคลอรีประจำวันค่ะ">
                + แนะนำของว่างคลีน
              </button>
            </div>

            <textarea class="admin-reply-textarea" id="replyText-${item.id}" placeholder="พิมพ์คำแนะนำทางโภชนาการหรือสูตรอาหารที่เหมาะสมกับเป้าหมายของผู้ใช้...">${isAnswered ? escapeHtml(item.admin_reply || '') : ''}</textarea>

            <button type="button" class="btn-generate-shopping btn-send-admin-reply" data-id="${item.id}" style="padding:8px 18px; font-size:0.85rem;">
              <span>🚀</span> ${isAnswered ? 'อัปเดตคำแนะนำ' : 'ส่งคำแนะนำให้ผู้ใช้'}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Attach Quick template chips
    list.querySelectorAll('.template-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const id = chip.getAttribute('data-target-id');
        const text = chip.getAttribute('data-text');
        const textarea = document.getElementById(`replyText-${id}`);
        if (textarea) {
          if (textarea.value) textarea.value += ' ' + text;
          else textarea.value = text;
        }
      });
    });

    // Attach Reply submission buttons
    list.querySelectorAll('.btn-send-admin-reply').forEach(btn => {
      btn.addEventListener('click', async () => {
        const id = btn.getAttribute('data-id');
        const textarea = document.getElementById(`replyText-${id}`);
        const replyText = textarea ? textarea.value.trim() : '';

        if (!replyText) {
          showToast('กรุณาระบุข้อความคำแนะนำก่อนส่ง', '⚠️');
          return;
        }

        // 1. Reply via Supabase PostgreSQL
        if (state.isSupabaseUser && window.SupabaseService) {
          const ok = await window.SupabaseService.replyConsultation(id, replyText, state.currentUser.name, state.currentUser.uid || state.currentUser.id);
          if (ok) {
            showToast('ส่งคำแนะนำและอัปเดตลง Supabase เรียบร้อยแล้ว! 🌟', '⚡');
            loadAdminStats();
            loadAdminConsultations();
          } else {
            showToast('ส่งคำแนะนำไม่สำเร็จ กรุณาลองใหม่อีกครั้ง', '⚠️');
          }
          return;
        }

        // 2. Reply via SQLite backend
        try {
          const res = await fetch(`/api/admin/consultations/${id}/reply`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${state.authToken}`
            },
            body: JSON.stringify({ replyText })
          });
          const data = await res.json();
          if (data.success) {
            showToast('ส่งคำแนะนำให้ผู้ใช้งานเรียบร้อยแล้ว!', '🌟');
            loadAdminStats();
            loadAdminConsultations();
          } else {
            showToast(data.message || 'ส่งคำแนะนำไม่สำเร็จ', '⚠️');
          }
        } catch (err) {
          showToast('เกิดข้อผิดพลาดในการส่ง', '❌');
        }
      });
    });
  }

  // Filter Buttons in Admin Queue
  document.querySelectorAll('[data-admin-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-admin-filter]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.adminFilter = btn.getAttribute('data-admin-filter');
      loadAdminConsultations();
    });
  });

  // Admin User Directory Table
  async function loadAdminUserDirectory() {
    if (!state.currentUser) return;

    if (state.isSupabaseUser && window.SupabaseService) {
      try {
        const users = await window.SupabaseService.getAdminUsers();
        const tbody = document.getElementById('adminUserDirTableBody');
        if (users && users.length > 0) {
          tbody.innerHTML = users.map(u => `
            <tr>
              <td>
                <div style="display:flex; align-items:center; gap:8px;">
                  ${u.photoURL ? `<img src="${escapeHtml(u.photoURL)}" class="user-avatar-img" style="width:24px; height:24px;" alt="${escapeHtml(u.name || '')}">` : '<span>👤</span>'}
                  <strong>${escapeHtml(u.name || 'ผู้ใช้ Google')}</strong> ${u.role === 'admin' ? '<span style="color:var(--orange-600); font-weight:800;">(Admin)</span>' : ''}
                </div>
              </td>
              <td>${escapeHtml(u.email || '-')}</td>
              <td><strong>${u.target_calories || 2000}</strong> kcal</td>
              <td>${escapeHtml(u.health_goal || '-')}</td>
              <td><span class="badge" style="background:var(--green-50); color:var(--green-700);">สมาชิก Supabase</span></td>
            </tr>
          `).join('');
        }
      } catch (e) {}
      return;
    }

    if (!state.authToken) return;
    try {
      const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${state.authToken}` }
      });
      const data = await res.json();
      if (data.success && data.users) {
        const tbody = document.getElementById('adminUserDirTableBody');
        tbody.innerHTML = data.users.map(u => `
          <tr>
            <td>
              <strong>${u.name}</strong> ${u.role === 'admin' ? '<span style="color:var(--orange-600); font-weight:800;">(Admin)</span>' : ''}
            </td>
            <td>${u.email}</td>
            <td><strong>${u.target_calories}</strong> kcal</td>
            <td>${u.health_goal || '-'}</td>
            <td><span class="badge" style="background:var(--green-50); color:var(--green-700);">${u.consultation_count} คำถาม</span></td>
          </tr>
        `).join('');
      }
    } catch (e) {}
  }

  // =========================================================================
  // 7. NAVIGATION & VIEW SWITCHER
  // =========================================================================
  function switchView(viewName) {
    if (!views[viewName]) return;
    state.currentView = viewName;

    Object.keys(views).forEach(key => {
      views[key].classList.toggle('active', key === viewName);
    });

    Object.keys(navTabs).forEach(key => {
      const btn = navTabs[key];
      const isActive = key === viewName;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (viewName === 'plannerView') {
      renderPlannerWorkspace();
      updateNutritionSummary();
    } else if (viewName === 'detailView') {
      renderRecipeDetail(state.currentDetailRecipeId);
    }
  }

  // Bind Nav tab buttons
  Object.keys(navTabs).forEach(key => {
    navTabs[key].addEventListener('click', () => switchView(key));
  });

  document.getElementById('logoLink').addEventListener('click', (e) => {
    e.preventDefault();
    switchView('exploreView');
  });

  document.getElementById('btnBackToExplore').addEventListener('click', () => {
    switchView('exploreView');
  });

  // =========================================================================
  // 8. VIEW 1: EXPLORE & SEARCH LOGIC
  // =========================================================================
  function getFilteredRecipes() {
    return RECIPES_DATA.filter(recipe => {
      // 1. Text Search
      if (state.searchQuery.trim() !== '') {
        const query = state.searchQuery.toLowerCase().trim();
        const matchesTitle = recipe.title.toLowerCase().includes(query) || recipe.titleEn.toLowerCase().includes(query);
        const matchesTags = recipe.tags.some(t => t.toLowerCase().includes(query));
        const matchesIngredient = recipe.ingredients.some(ing => ing.name.toLowerCase().includes(query));
        if (!matchesTitle && !matchesTags && !matchesIngredient) {
          return false;
        }
      }

      // 2. Category Filter
      if (state.activeCategory !== 'all') {
        if (recipe.category !== state.activeCategory) return false;
      }

      // 3. Quick Badges
      if (state.activeBadge !== 'all') {
        if (state.activeBadge === 'saved') {
          if (!state.savedRecipeIds.has(recipe.id)) return false;
        } else {
          if (!recipe.tags.includes(state.activeBadge)) return false;
        }
      }

      // 4. Pantry Fridge Filter
      if (state.selectedPantryIds.size > 0) {
        const selectedKeywords = Array.from(state.selectedPantryIds).map(id => {
          const item = PANTRY_ITEMS.find(p => p.id === id);
          return item ? item.name.split('/')[0].trim().toLowerCase() : '';
        });

        const hasMatch = selectedKeywords.some(keyword => {
          return recipe.ingredients.some(ing => ing.name.toLowerCase().includes(keyword));
        });

        if (!hasMatch) return false;
      }

      return true;
    });
  }

  function renderRecipeGrid() {
    const recipes = getFilteredRecipes();
    resultsCountText.innerHTML = `พบสูตรอาหารทั้งหมด <strong>${recipes.length}</strong> รายการ`;

    if (recipes.length === 0) {
      recipeGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🍲</div>
          <h3>ไม่พบสูตรอาหารที่ตรงกับเงื่อนไข</h3>
          <p style="color:var(--text-muted); font-size:0.9rem;">ลองปรับคำค้นหา หรือกดล้างตัวกรองวัตถุดิบเพื่อดูเมนูทั้งหมด</p>
          <button class="btn-generate-shopping" id="btnResetAllFilters" style="margin:18px auto 0; padding:8px 18px; font-size:0.85rem;">
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      `;
      const btnReset = document.getElementById('btnResetAllFilters');
      if (btnReset) {
        btnReset.addEventListener('click', resetAllFilters);
      }
      return;
    }

    recipeGrid.innerHTML = recipes.map(recipe => {
      const isSaved = state.savedRecipeIds.has(recipe.id);
      const difficultyClass = recipe.difficulty === 'Easy' ? 'difficulty-easy' : (recipe.difficulty === 'Medium' ? 'difficulty-med' : 'difficulty-hard');

      return `
        <article class="recipe-card" data-id="${recipe.id}">
          <div class="card-media-wrap">
            <img class="card-img" src="${recipe.image}" alt="${recipe.title}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null; if('${recipe.fallbackImage || ''}') this.src='${recipe.fallbackImage}';">
            <div class="card-floating-top">
              <span class="difficulty-badge ${difficultyClass}">${recipe.difficultyTh}</span>
              <button class="bookmark-btn ${isSaved ? 'saved' : ''}" data-id="${recipe.id}" title="${isSaved ? 'นำออกจากเมนูโปรด' : 'บันทึกเป็นเมนูโปรด'}">
                ${isSaved ? '❤️' : '🤍'}
              </button>
            </div>
            <div class="card-calorie-pill">
              🔥 ${recipe.calories} kcal
            </div>
          </div>

          <div class="card-body">
            <div class="card-tags">
              ${recipe.tags.slice(0, 3).map(tag => `<span class="card-tag">${tag}</span>`).join('')}
            </div>
            <h3 class="card-title">${recipe.title}</h3>
            <div class="card-title-en">${recipe.titleEn}</div>

            <div class="card-meta-row">
              <div class="meta-time">
                <span>⏱️</span> ${(recipe.prepTime + recipe.cookTime)} นาที
              </div>
              <div class="meta-rating">
                <span>★</span> ${recipe.rating} (${recipe.reviewsCount})
              </div>
            </div>
          </div>

          <div class="card-actions">
            <button class="btn-card-view" data-action="view" data-id="${recipe.id}">
              ดูวิธีทำ
            </button>
            <button class="btn-card-add-planner" data-action="addToPlan" data-id="${recipe.id}">
              <span>➕</span> ใส่ตาราง
            </button>
          </div>
        </article>
      `;
    }).join('');

    // Attach event listeners to cards
    recipeGrid.querySelectorAll('.recipe-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.bookmark-btn') || e.target.closest('.btn-card-add-planner')) return;
        const recipeId = card.getAttribute('data-id');
        openRecipeDetail(recipeId);
      });
    });

    recipeGrid.querySelectorAll('.bookmark-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        toggleBookmark(id);
      });
    });

    recipeGrid.querySelectorAll('.btn-card-add-planner').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        openAddToPlanModal(id);
      });
    });
  }

  function resetAllFilters() {
    state.searchQuery = '';
    recipeSearchInput.value = '';
    btnClearSearch.classList.remove('show');
    state.activeCategory = 'all';
    state.activeBadge = 'all';
    state.selectedPantryIds.clear();

    categoryPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-cat') === 'all'));
    quickBadgeButtons.forEach(b => b.classList.toggle('active', b.getAttribute('data-badge') === 'all'));

    renderRecipeGrid();
    updatePantryModalUI();
  }

  function toggleBookmark(recipeId) {
    const recipe = RECIPES_DATA.find(r => r.id === recipeId);
    if (!recipe) return;

    if (state.savedRecipeIds.has(recipeId)) {
      state.savedRecipeIds.delete(recipeId);
      showToast(`นำ "${recipe.title}" ออกจากเมนูโปรดแล้ว`, '🤍');
    } else {
      state.savedRecipeIds.add(recipeId);
      showToast(`บันทึก "${recipe.title}" เข้าเมนูโปรดแล้ว!`, '❤️');
    }

    localStorage.setItem('freshplate_saved', JSON.stringify(Array.from(state.savedRecipeIds)));
    syncUserDataToServer();
    renderRecipeGrid();
    renderDraggableSidebarList();

    if (state.currentDetailRecipeId === recipeId) {
      updateDetailBookmarkBtn();
    }
  }

  recipeSearchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    btnClearSearch.classList.toggle('show', state.searchQuery.length > 0);
    renderRecipeGrid();
  });

  btnClearSearch.addEventListener('click', () => {
    recipeSearchInput.value = '';
    state.searchQuery = '';
    btnClearSearch.classList.remove('show');
    renderRecipeGrid();
    recipeSearchInput.focus();
  });

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeCategory = pill.getAttribute('data-cat');
      renderRecipeGrid();
    });
  });

  quickBadgeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      quickBadgeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeBadge = btn.getAttribute('data-badge');
      renderRecipeGrid();
    });
  });

  // =========================================================================
  // 9. VIEW 2: WEEKLY MEAL PLANNER WORKSPACE
  // =========================================================================
  function renderPlannerWorkspace() {
    renderDraggableSidebarList();
    renderDaySelectorPills();
    renderWeeklyTable();
    updateTotalMealCountBadge();
  }

  function renderDraggableSidebarList() {
    const filterQuery = (sidebarSearchInput.value || '').toLowerCase().trim();
    const filtered = RECIPES_DATA.filter(r => {
      if (!filterQuery) return true;
      return r.title.toLowerCase().includes(filterQuery) || r.titleEn.toLowerCase().includes(filterQuery);
    });

    sidebarRecipeList.innerHTML = filtered.map(recipe => {
      const isSaved = state.savedRecipeIds.has(recipe.id);
      return `
        <div class="draggable-recipe-item" draggable="true" data-id="${recipe.id}">
          <img class="draggable-thumb" src="${recipe.image}" alt="${recipe.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; if('${recipe.fallbackImage || ''}') this.src='${recipe.fallbackImage}';">
          <div class="draggable-info">
            <div class="draggable-name">${recipe.title}</div>
            <div class="draggable-meta">
              <span>🔥 ${recipe.calories} kcal</span>
              <span>⏱️ ${recipe.prepTime + recipe.cookTime} นาที</span>
              ${isSaved ? '<span>❤️</span>' : ''}
            </div>
          </div>
          <span class="draggable-drag-handle">⠿</span>
        </div>
      `;
    }).join('');

    sidebarRecipeList.querySelectorAll('.draggable-recipe-item').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        const id = item.getAttribute('data-id');
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'copy';
        item.style.opacity = '0.5';
      });

      item.addEventListener('dragend', () => {
        item.style.opacity = '1';
      });

      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        openAddToPlanModal(id);
      });
    });
  }

  sidebarSearchInput.addEventListener('input', () => {
    renderDraggableSidebarList();
  });

  function renderDaySelectorPills() {
    daySelectorPills.innerHTML = DAYS_ORDER.map(day => {
      const isSelected = day.key === state.activePlannerDay;
      const dayCalories = calculateDayCalories(day.key);
      return `
        <button class="day-tab-btn ${isSelected ? 'active' : ''}" data-day="${day.key}">
          <span>${day.th}</span>
          <span class="day-cal">${dayCalories} kcal</span>
        </button>
      `;
    }).join('');

    daySelectorPills.querySelectorAll('.day-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const dayKey = btn.getAttribute('data-day');
        selectPlannerDay(dayKey);
      });
    });
  }

  function selectPlannerDay(dayKey) {
    state.activePlannerDay = dayKey;
    renderDaySelectorPills();
    renderWeeklyTable();
    updateNutritionSummary();
  }

  function calculateDayCalories(dayKey) {
    const dayPlan = state.mealPlan[dayKey] || {};
    let total = 0;
    Object.values(dayPlan).forEach(recId => {
      if (recId) {
        const recipe = RECIPES_DATA.find(r => r.id === recId);
        if (recipe) total += recipe.calories;
      }
    });
    return total;
  }

  function renderWeeklyTable() {
    weeklyDaysGrid.innerHTML = DAYS_ORDER.map(day => {
      const isSelectedDay = day.key === state.activePlannerDay;
      const dayPlan = state.mealPlan[day.key] || {};
      const dayTotalKcal = calculateDayCalories(day.key);

      const slotsHtml = MEAL_TYPES.map(meal => {
        const recipeId = dayPlan[meal.key];
        const recipe = recipeId ? RECIPES_DATA.find(r => r.id === recipeId) : null;

        return `
          <div class="meal-slot-card" data-day="${day.key}" data-meal="${meal.key}">
            <div class="meal-slot-label">${meal.icon} ${meal.th}</div>
            ${recipe ? `
              <div class="filled-meal-card" data-id="${recipe.id}">
                <img class="filled-thumb" src="${recipe.image}" alt="${recipe.title}" referrerpolicy="no-referrer" onerror="this.onerror=null; if('${recipe.fallbackImage || ''}') this.src='${recipe.fallbackImage}';">
                <div class="filled-details">
                  <div class="filled-title" title="${recipe.title}">${recipe.title}</div>
                  <div class="filled-kcal">${recipe.calories} kcal</div>
                </div>
                <button class="btn-remove-meal" data-day="${day.key}" data-meal="${meal.key}" title="นำออกจากมื้อนี้">✕</button>
              </div>
            ` : `
              <div class="empty-slot-content" data-day="${day.key}" data-meal="${meal.key}">
                <span class="plus-icon">+</span>
                <span class="empty-slot-text">เพิ่มเมนู</span>
              </div>
            `}
          </div>
        `;
      }).join('');

      return `
        <div class="day-column ${isSelectedDay ? 'is-selected-day' : ''}" data-day="${day.key}">
          <div class="day-col-header" data-day="${day.key}">
            <div class="day-name-th">${day.th}</div>
            <div class="day-total-kcal">${dayTotalKcal} kcal</div>
          </div>
          <div class="meal-slots-container">
            ${slotsHtml}
          </div>
        </div>
      `;
    }).join('');

    weeklyDaysGrid.querySelectorAll('.day-col-header').forEach(hdr => {
      hdr.addEventListener('click', () => {
        const dayKey = hdr.getAttribute('data-day');
        selectPlannerDay(dayKey);
      });
    });

    weeklyDaysGrid.querySelectorAll('.empty-slot-content').forEach(slot => {
      slot.addEventListener('click', () => {
        const day = slot.getAttribute('data-day');
        const meal = slot.getAttribute('data-meal');
        openEmptySlotPickerModal(day, meal);
      });
    });

    weeklyDaysGrid.querySelectorAll('.filled-meal-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-remove-meal')) return;
        const recipeId = card.getAttribute('data-id');
        openRecipeDetail(recipeId);
      });
    });

    weeklyDaysGrid.querySelectorAll('.btn-remove-meal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const day = btn.getAttribute('data-day');
        const meal = btn.getAttribute('data-meal');
        removeMealFromPlan(day, meal);
      });
    });

    weeklyDaysGrid.querySelectorAll('.meal-slot-card').forEach(slotCard => {
      slotCard.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        slotCard.classList.add('drag-over');
      });

      slotCard.addEventListener('dragleave', () => {
        slotCard.classList.remove('drag-over');
      });

      slotCard.addEventListener('drop', (e) => {
        e.preventDefault();
        slotCard.classList.remove('drag-over');
        const recipeId = e.dataTransfer.getData('text/plain');
        const day = slotCard.getAttribute('data-day');
        const meal = slotCard.getAttribute('data-meal');

        if (recipeId && day && meal) {
          assignMealToPlan(day, meal, recipeId);
        }
      });
    });
  }

  function assignMealToPlan(dayKey, mealKey, recipeId) {
    if (!state.mealPlan[dayKey]) {
      state.mealPlan[dayKey] = {};
    }
    state.mealPlan[dayKey][mealKey] = recipeId;
    localStorage.setItem('freshplate_mealplan', JSON.stringify(state.mealPlan));
    syncUserDataToServer();

    const recipe = RECIPES_DATA.find(r => r.id === recipeId);
    const dayObj = DAYS_ORDER.find(d => d.key === dayKey);
    const mealObj = MEAL_TYPES.find(m => m.key === mealKey);

    showToast(`เพิ่ม "${recipe ? recipe.title : 'เมนู'}" ลงใน ${mealObj.th} ${dayObj.th} แล้ว!`, '🍲');

    renderDaySelectorPills();
    renderWeeklyTable();
    updateNutritionSummary();
    updateTotalMealCountBadge();
    updateShoppingBadgeCount();
  }

  function removeMealFromPlan(dayKey, mealKey) {
    if (state.mealPlan[dayKey]) {
      state.mealPlan[dayKey][mealKey] = null;
      localStorage.setItem('freshplate_mealplan', JSON.stringify(state.mealPlan));
      syncUserDataToServer();
    }

    showToast('นำเมนูออกจากมื้ออาหารแล้ว', '🗑️');

    renderDaySelectorPills();
    renderWeeklyTable();
    updateNutritionSummary();
    updateTotalMealCountBadge();
    updateShoppingBadgeCount();
  }

  btnClearMealPlan.addEventListener('click', () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการล้างตารางมื้ออาหารทั้งหมดในสัปดาห์นี้?')) {
      DAYS_ORDER.forEach(d => {
        state.mealPlan[d.key] = { breakfast: null, lunch: null, dinner: null, snack: null };
      });
      localStorage.setItem('freshplate_mealplan', JSON.stringify(state.mealPlan));
      syncUserDataToServer();
      showToast('ล้างตารางมื้ออาหารเรียบร้อยแล้ว', '🧹');
      renderPlannerWorkspace();
      updateNutritionSummary();
      updateShoppingBadgeCount();
    }
  });

  function updateTotalMealCountBadge() {
    let count = 0;
    Object.values(state.mealPlan).forEach(day => {
      if (day) {
        Object.values(day).forEach(recId => {
          if (recId) count++;
        });
      }
    });
    navPlannerCount.textContent = count;
  }

  // =========================================================================
  // 10. NUTRITION SUMMARY
  // =========================================================================
  function updateNutritionSummary() {
    const dayKey = state.activePlannerDay;
    const dayObj = DAYS_ORDER.find(d => d.key === dayKey);
    nutritionDayTag.textContent = dayObj ? dayObj.th : 'ภาพรวม';

    const dayPlan = state.mealPlan[dayKey] || {};
    let totalCals = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalFiber = 0;

    Object.values(dayPlan).forEach(recId => {
      if (recId) {
        const recipe = RECIPES_DATA.find(r => r.id === recId);
        if (recipe) {
          totalCals += recipe.macros.calories;
          totalProtein += recipe.macros.protein;
          totalCarbs += recipe.macros.carbs;
          totalFat += recipe.macros.fat;
          totalFiber += recipe.macros.fiber;
        }
      }
    });

    const target = DEFAULT_NUTRITION_TARGET;

    calCurrentText.textContent = totalCals.toLocaleString();
    calTargetText.textContent = target.calories.toLocaleString();

    const calPercent = Math.min(Math.round((totalCals / target.calories) * 100), 100);
    dialPercentText.textContent = `${calPercent}%`;

    calorieCircleProgress.setAttribute('stroke-dasharray', `${calPercent}, 100`);

    const remaining = target.calories - totalCals;
    if (remaining > 0) {
      calRemainingText.textContent = `เหลืออีก ${remaining.toLocaleString()} kcal`;
      calRemainingText.style.color = 'var(--text-light)';
    } else if (remaining === 0) {
      calRemainingText.textContent = `ครบเป้าหมายพอดี! 🎯`;
      calRemainingText.style.color = 'var(--green-700)';
    } else {
      calRemainingText.textContent = `เกินเป้าหมาย ${Math.abs(remaining).toLocaleString()} kcal`;
      calRemainingText.style.color = 'var(--status-med)';
    }

    const proteinPercent = Math.min(Math.round((totalProtein / target.protein) * 100), 100);
    proteinValText.textContent = `${totalProtein}g / ${target.protein}g (${proteinPercent}%)`;
    proteinProgressFill.style.width = `${proteinPercent}%`;

    const carbsPercent = Math.min(Math.round((totalCarbs / target.carbs) * 100), 100);
    carbsValText.textContent = `${totalCarbs}g / ${target.carbs}g (${carbsPercent}%)`;
    carbsProgressFill.style.width = `${carbsPercent}%`;

    const fatPercent = Math.min(Math.round((totalFat / target.fat) * 100), 100);
    fatValText.textContent = `${totalFat}g / ${target.fat}g (${fatPercent}%)`;
    fatProgressFill.style.width = `${fatPercent}%`;

    const fiberPercent = Math.min(Math.round((totalFiber / target.fiber) * 100), 100);
    fiberValText.textContent = `${totalFiber}g / ${target.fiber}g (${fiberPercent}%)`;
    fiberProgressFill.style.width = `${fiberPercent}%`;

    updateHealthAlert(totalCals, totalProtein, target);
  }

  function updateHealthAlert(calories, protein, target) {
    if (calories === 0) {
      nutritionAlertCard.className = 'nutrition-alert-card alert-good';
      nutritionAlertCard.querySelector('.alert-icon').textContent = '💡';
      nutritionAlertText.textContent = 'ยังไม่ได้จัดมื้ออาหารสำหรับวันนี้ ลากเมนูจากแถบซ้ายมือมาวางได้เลย!';
      return;
    }

    const calRatio = calories / target.calories;
    const proteinRatio = protein / target.protein;

    if (calRatio >= 0.85 && calRatio <= 1.05 && proteinRatio >= 0.8) {
      nutritionAlertCard.className = 'nutrition-alert-card alert-good';
      nutritionAlertCard.querySelector('.alert-icon').textContent = '🌟';
      nutritionAlertText.innerHTML = `<strong>ยอดเยี่ยมมาก!</strong> สัดส่วนพลังงาน (${calories} kcal) และโปรตีน (${protein}g) ของวันนี้สมดุลตามเป้าหมายสุขภาพดี`;
    } else if (calRatio < 0.85) {
      nutritionAlertCard.className = 'nutrition-alert-card alert-warning';
      nutritionAlertCard.querySelector('.alert-icon').textContent = '⚠️';
      nutritionAlertText.innerHTML = `<strong>พลังงานยังขาดอีก ${target.calories - calories} kcal</strong> แนะนำเพิ่มมื้อว่างหรือสมูทตี้โบวล์เพื่อไม่ให้ร่างกายขาดสารอาหาร`;
    } else if (calRatio > 1.05) {
      nutritionAlertCard.className = 'nutrition-alert-card alert-warning';
      nutritionAlertCard.querySelector('.alert-icon').textContent = '🔥';
      nutritionAlertText.innerHTML = `<strong>พลังงานเกินเป้าหมาย ${calories - target.calories} kcal</strong> สามารถปรับลดขนาดเสิร์ฟ หรือเลี่ยงเมนูคาร์บสูงในมื้อเย็น`;
    }
  }

  // =========================================================================
  // 11. VIEW 3: RECIPE DETAIL VIEW LOGIC
  // =========================================================================
  function openRecipeDetail(recipeId) {
    state.currentDetailRecipeId = recipeId;
    const recipe = RECIPES_DATA.find(r => r.id === recipeId);
    if (!recipe) return;

    state.currentServings = recipe.baseServings;
    state.checkedIngredients.clear();

    switchView('detailView');
    renderRecipeDetail(recipeId);
  }

  function renderRecipeDetail(recipeId) {
    const recipe = RECIPES_DATA.find(r => r.id === recipeId);
    if (!recipe) return;

    const heroImg = document.getElementById('detailHeroImg');
    heroImg.src = recipe.image;
    heroImg.alt = recipe.title;
    heroImg.setAttribute('referrerpolicy', 'no-referrer');
    heroImg.onerror = () => {
      heroImg.onerror = null;
      if (recipe.fallbackImage) heroImg.src = recipe.fallbackImage;
    };

    const diffBadge = document.getElementById('detailDifficultyBadge');
    diffBadge.textContent = recipe.difficultyTh;
    diffBadge.className = `difficulty-badge ${recipe.difficulty === 'Easy' ? 'difficulty-easy' : (recipe.difficulty === 'Medium' ? 'difficulty-med' : 'difficulty-hard')}`;

    document.getElementById('detailTimeBadge').textContent = `⏱️ ${(recipe.prepTime + recipe.cookTime)} นาที`;
    document.getElementById('detailKcalBadge').textContent = `🔥 ${recipe.calories} kcal/ที่`;
    document.getElementById('recipeCategoryBreadcrumb').textContent = `หมวดหมู่: ${getCategoryLabel(recipe.category)}`;

    document.getElementById('currentServingValue').textContent = `${state.currentServings} ที่`;

    renderDetailIngredients(recipe);

    document.getElementById('detailTitleText').textContent = recipe.title;
    document.getElementById('detailTitleEnText').textContent = recipe.titleEn;
    document.getElementById('detailDescText').textContent = recipe.description;

    const tagsRow = document.getElementById('detailTagsRow');
    tagsRow.innerHTML = recipe.tags.map(t => `<span class="card-tag">${t}</span>`).join('');

    updateDetailBookmarkBtn();

    document.getElementById('chipCalText').textContent = recipe.macros.calories;
    document.getElementById('chipProteinText').textContent = `${recipe.macros.protein}g`;
    document.getElementById('chipCarbsText').textContent = `${recipe.macros.carbs}g`;
    document.getElementById('chipFatText').textContent = `${recipe.macros.fat}g`;

    renderDetailSteps(recipe);
  }

  function getCategoryLabel(cat) {
    const map = {
      main: 'อาหารจานหลัก',
      bowl: 'โบวล์สุขภาพ',
      salad: 'สลัดสด',
      soup: 'ต้ม/ซุป',
      snack: 'ของว่าง/อาหารเช้า'
    };
    return map[cat] || 'ทั่วไป';
  }

  function renderDetailIngredients(recipe) {
    const ingredientsList = document.getElementById('detailIngredientsList');
    const multiplier = state.currentServings / recipe.baseServings;

    ingredientsList.innerHTML = recipe.ingredients.map((ing, idx) => {
      const scaledAmount = roundIngredientAmount(ing.amount * multiplier);
      const ingId = `ing-${recipe.id}-${idx}`;
      const isChecked = state.checkedIngredients.has(ingId);

      return `
        <li class="ingredient-item ${isChecked ? 'checked' : ''}" data-id="${ingId}">
          <input type="checkbox" class="ingredient-checkbox" id="${ingId}" ${isChecked ? 'checked' : ''}>
          <label for="${ingId}" class="ingredient-name">${ing.name}</label>
          <span class="ingredient-amount">${scaledAmount} ${ing.unit}</span>
        </li>
      `;
    }).join('');

    ingredientsList.querySelectorAll('.ingredient-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const id = cb.id;
        const item = cb.closest('.ingredient-item');
        if (cb.checked) {
          state.checkedIngredients.add(id);
          item.classList.add('checked');
        } else {
          state.checkedIngredients.delete(id);
          item.classList.remove('checked');
        }
      });
    });
  }

  function roundIngredientAmount(num) {
    if (Number.isInteger(num)) return num;
    return parseFloat(num.toFixed(1));
  }

  document.getElementById('btnServingMinus').addEventListener('click', () => {
    if (state.currentServings > 1) {
      state.currentServings--;
      document.getElementById('currentServingValue').textContent = `${state.currentServings} ที่`;
      const recipe = RECIPES_DATA.find(r => r.id === state.currentDetailRecipeId);
      if (recipe) renderDetailIngredients(recipe);
    }
  });

  document.getElementById('btnServingPlus').addEventListener('click', () => {
    if (state.currentServings < 12) {
      state.currentServings++;
      document.getElementById('currentServingValue').textContent = `${state.currentServings} ที่`;
      const recipe = RECIPES_DATA.find(r => r.id === state.currentDetailRecipeId);
      if (recipe) renderDetailIngredients(recipe);
    }
  });

  function renderDetailSteps(recipe) {
    const list = document.getElementById('detailStepsList');

    list.innerHTML = recipe.steps.map(step => {
      const hasTimer = step.timerSeconds > 0;
      const stepTimerId = `timer-${recipe.id}-${step.step}`;

      return `
        <div class="step-card">
          <div class="step-number-bubble">${step.step}</div>
          <div class="step-content">
            <h4 class="step-title">${step.title}</h4>
            <p class="step-text">${step.text}</p>
            ${step.tip ? `
              <div class="step-tip">
                <span>💡 เคล็ดลับเชฟ:</span> ${step.tip}
              </div>
            ` : ''}

            ${hasTimer ? `
              <div class="step-timer-widget" id="widget-${stepTimerId}">
                <div class="timer-left">
                  <span class="timer-clock-icon">⏱️</span>
                  <div>
                    <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">ตัวจับเวลาขั้นตอนนี้</div>
                    <div class="timer-time-display" id="display-${stepTimerId}">${formatSeconds(step.timerSeconds)}</div>
                  </div>
                </div>
                <div class="timer-controls">
                  <button class="btn-timer-action btn-timer-start" id="btnStart-${stepTimerId}" data-timer="${stepTimerId}" data-seconds="${step.timerSeconds}">
                    เริ่ม
                  </button>
                  <button class="btn-timer-action btn-timer-pause" id="btnPause-${stepTimerId}" data-timer="${stepTimerId}" style="display:none;">
                    พัก
                  </button>
                  <button class="btn-timer-action btn-timer-reset" id="btnReset-${stepTimerId}" data-timer="${stepTimerId}" data-seconds="${step.timerSeconds}">
                    รีเซ็ต
                  </button>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    recipe.steps.forEach(step => {
      if (step.timerSeconds > 0) {
        setupStepTimer(recipe.id, step.step, step.timerSeconds);
      }
    });
  }

  function formatSeconds(secs) {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function setupStepTimer(recipeId, stepNum, totalSeconds) {
    const timerKey = `timer-${recipeId}-${stepNum}`;
    const btnStart = document.getElementById(`btnStart-${timerKey}`);
    const btnPause = document.getElementById(`btnPause-${timerKey}`);
    const btnReset = document.getElementById(`btnReset-${timerKey}`);
    const display = document.getElementById(`display-${timerKey}`);

    state.activeTimers[timerKey] = {
      remaining: totalSeconds,
      total: totalSeconds,
      intervalId: null,
      isRunning: false
    };

    btnStart.addEventListener('click', () => {
      const t = state.activeTimers[timerKey];
      if (t.isRunning) return;

      t.isRunning = true;
      btnStart.style.display = 'none';
      btnPause.style.display = 'inline-flex';

      t.intervalId = setInterval(() => {
        t.remaining--;
        display.textContent = formatSeconds(t.remaining);

        if (t.remaining <= 0) {
          clearInterval(t.intervalId);
          t.isRunning = false;
          btnStart.style.display = 'inline-flex';
          btnPause.style.display = 'none';
          showToast(`⏰ เวลาสำหรับขั้นตอนที่ ${stepNum} หมดแล้ว! พร้อมสำหรับขั้นตอนถัดไป`, '🔔');
        }
      }, 1000);
    });

    btnPause.addEventListener('click', () => {
      const t = state.activeTimers[timerKey];
      clearInterval(t.intervalId);
      t.isRunning = false;
      btnStart.style.display = 'inline-flex';
      btnPause.style.display = 'none';
    });

    btnReset.addEventListener('click', () => {
      const t = state.activeTimers[timerKey];
      clearInterval(t.intervalId);
      t.isRunning = false;
      t.remaining = totalSeconds;
      display.textContent = formatSeconds(totalSeconds);
      btnStart.style.display = 'inline-flex';
      btnPause.style.display = 'none';
    });
  }

  function updateDetailBookmarkBtn() {
    const btn = document.getElementById('btnDetailBookmark');
    const isSaved = state.savedRecipeIds.has(state.currentDetailRecipeId);
    btn.classList.toggle('saved', isSaved);
    btn.innerHTML = `<span>${isSaved ? '❤️' : '🤍'}</span> ${isSaved ? 'บันทึกในสูตรโปรดแล้ว' : 'บันทึกเข้าเมนูโปรด'}`;
  }

  document.getElementById('btnDetailBookmark').addEventListener('click', () => {
    toggleBookmark(state.currentDetailRecipeId);
  });

  document.getElementById('btnDetailAddToPlan').addEventListener('click', () => {
    openAddToPlanModal(state.currentDetailRecipeId);
  });

  document.getElementById('btnAddRecipeToShopping').addEventListener('click', () => {
    const recipe = RECIPES_DATA.find(r => r.id === state.currentDetailRecipeId);
    if (!recipe) return;
    showToast(`เพิ่มวัตถุดิบ ${recipe.ingredients.length} รายการลงใน Shopping List เรียบร้อย!`, '🛒');
    updateShoppingBadgeCount();
  });

  // =========================================================================
  // 12. MODALS: PANTRY SEARCH, SHOPPING LIST & MEAL PICKER
  // =========================================================================
  function renderPantryTags() {
    pantryTagsGrid.innerHTML = PANTRY_ITEMS.map(item => {
      const isSelected = state.selectedPantryIds.has(item.id);
      return `
        <div class="pantry-tag-choice ${isSelected ? 'selected' : ''}" data-id="${item.id}">
          <span>${item.icon}</span>
          <span>${item.name}</span>
        </div>
      `;
    }).join('');

    pantryTagsGrid.querySelectorAll('.pantry-tag-choice').forEach(tag => {
      tag.addEventListener('click', () => {
        const id = tag.getAttribute('data-id');
        if (state.selectedPantryIds.has(id)) {
          state.selectedPantryIds.delete(id);
          tag.classList.remove('selected');
        } else {
          state.selectedPantryIds.add(id);
          tag.classList.add('selected');
        }
        updatePantryModalUI();
      });
    });
  }

  function updatePantryModalUI() {
    const filtered = getFilteredRecipes();
    pantryMatchCount.textContent = filtered.length;
  }

  function openPantryModal() {
    renderPantryTags();
    updatePantryModalUI();
    pantryModalBackdrop.classList.add('open');
  }

  function closePantryModal() {
    pantryModalBackdrop.classList.remove('open');
  }

  document.getElementById('btnPantryTrigger').addEventListener('click', openPantryModal);
  document.getElementById('btnOpenPantryHeader').addEventListener('click', openPantryModal);
  document.getElementById('btnClosePantryModal').addEventListener('click', closePantryModal);

  document.getElementById('btnClearPantrySelection').addEventListener('click', () => {
    state.selectedPantryIds.clear();
    renderPantryTags();
    updatePantryModalUI();
  });

  document.getElementById('btnApplyPantryFilter').addEventListener('click', () => {
    closePantryModal();
    switchView('exploreView');
    renderRecipeGrid();
    if (state.selectedPantryIds.size > 0) {
      showToast(`กรองสูตรอาหารตามวัตถุดิบที่คุณเลือก (${state.selectedPantryIds.size} รายการ)`, '❄️');
    }
  });

  function generateAggregatedShoppingList() {
    const ingredientMap = {};

    Object.values(state.mealPlan).forEach(day => {
      if (day) {
        Object.values(day).forEach(recId => {
          if (recId) {
            const recipe = RECIPES_DATA.find(r => r.id === recId);
            if (recipe) {
              recipe.ingredients.forEach(ing => {
                const key = `${ing.name}__${ing.unit}`;
                if (!ingredientMap[key]) {
                  ingredientMap[key] = {
                    name: ing.name,
                    amount: 0,
                    unit: ing.unit,
                    category: ing.category || 'other'
                  };
                }
                ingredientMap[key].amount += ing.amount;
              });
            }
          }
        });
      }
    });

    return Object.values(ingredientMap);
  }

  function updateShoppingBadgeCount() {
    const list = generateAggregatedShoppingList();
    headerShoppingCount.textContent = list.length;
  }

  function openShoppingListModal() {
    renderShoppingList();
    shoppingModalBackdrop.classList.add('open');
  }

  function closeShoppingListModal() {
    shoppingModalBackdrop.classList.remove('open');
  }

  function renderShoppingList() {
    const list = generateAggregatedShoppingList();
    updateShoppingBadgeCount();

    if (list.length === 0) {
      shoppingListContainer.innerHTML = `
        <div style="text-align:center; padding:30px 10px; color:var(--text-muted);">
          <div style="font-size:2.5rem; margin-bottom:8px;">🛒</div>
          <h4>ยังไม่มีวัตถุดิบในรายการซื้อของ</h4>
          <p style="font-size:0.85rem;">ลองใส่เมนูอาหารลงในตารางสัปดาห์เพื่อรวมวัตถุดิบทั้งหมดที่นี่</p>
        </div>
      `;
      return;
    }

    const categories = {
      meat: { title: '🥩 เนื้อสัตว์และโปรตีน', items: [] },
      produce: { title: '🥦 ผักและผลไม้สด', items: [] },
      grains: { title: '🍚 ข้าว แป้ง และธัญพืช', items: [] },
      seasoning: { title: '🧂 ซอสและเครื่องปรุงรส', items: [] },
      other: { title: '📦 วัตถุดิบอื่นๆ', items: [] }
    };

    list.forEach(item => {
      const cat = categories[item.category] || categories.other;
      cat.items.push(item);
    });

    let html = '';
    Object.keys(categories).forEach(catKey => {
      const group = categories[catKey];
      if (group.items.length === 0) return;

      html += `
        <div class="shopping-cat-group">
          <div class="shopping-cat-title">${group.title} (${group.items.length})</div>
          <div>
            ${group.items.map(item => {
              const itemKey = `shop_${item.name}`;
              const isBought = state.boughtShoppingItems.has(itemKey);
              return `
                <div class="shopping-item-row ${isBought ? 'bought' : ''}" data-key="${itemKey}">
                  <div class="shopping-item-left">
                    <input type="checkbox" class="ingredient-checkbox shop-checkbox" data-key="${itemKey}" ${isBought ? 'checked' : ''}>
                    <span class="ingredient-name">${item.name}</span>
                  </div>
                  <span class="ingredient-amount">${roundIngredientAmount(item.amount)} ${item.unit}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    });

    shoppingListContainer.innerHTML = html;

    shoppingListContainer.querySelectorAll('.shop-checkbox').forEach(cb => {
      cb.addEventListener('change', () => {
        const key = cb.getAttribute('data-key');
        const row = cb.closest('.shopping-item-row');
        if (cb.checked) {
          state.boughtShoppingItems.add(key);
          row.classList.add('bought');
        } else {
          state.boughtShoppingItems.delete(key);
          row.classList.remove('bought');
        }
        localStorage.setItem('freshplate_bought', JSON.stringify(Array.from(state.boughtShoppingItems)));
      });
    });
  }

  document.getElementById('btnOpenShoppingHeader').addEventListener('click', openShoppingListModal);
  document.getElementById('btnGenerateShopping').addEventListener('click', openShoppingListModal);
  document.getElementById('btnCloseShoppingModal').addEventListener('click', closeShoppingListModal);

  document.getElementById('btnClearBoughtItems').addEventListener('click', () => {
    state.boughtShoppingItems.clear();
    localStorage.removeItem('freshplate_bought');
    renderShoppingList();
    showToast('ล้างสถานะการซื้อแล้ว', '🔄');
  });

  document.getElementById('btnCopyShoppingList').addEventListener('click', () => {
    const list = generateAggregatedShoppingList();
    if (list.length === 0) return;

    let text = '🛒 รายการซื้อของประจำสัปดาห์ (FreshPlate):\n\n';
    list.forEach((item, i) => {
      text += `${i + 1}. ${item.name} - ${roundIngredientAmount(item.amount)} ${item.unit}\n`;
    });

    navigator.clipboard.writeText(text).then(() => {
      showToast('คัดลอกรายการซื้อของลงคลิปบอร์ดแล้ว!', '📋');
    }).catch(() => {
      showToast('คัดลอกรายการซื้อของแล้ว', '📋');
    });
  });

  function openAddToPlanModal(recipeId) {
    const recipe = RECIPES_DATA.find(r => r.id === recipeId);
    if (!recipe) return;

    state.modalTargetSlot = { recipeId };

    const modalThumb = document.getElementById('modalAddPlanThumb');
    modalThumb.src = recipe.image;
    modalThumb.setAttribute('referrerpolicy', 'no-referrer');
    modalThumb.onerror = () => {
      modalThumb.onerror = null;
      if (recipe.fallbackImage) modalThumb.src = recipe.fallbackImage;
    };
    document.getElementById('modalAddPlanTitle').textContent = recipe.title;
    document.getElementById('modalAddPlanKcal').textContent = `🔥 ${recipe.calories} kcal`;

    document.getElementById('selectPlanDay').value = state.activePlannerDay;

    addToPlanModalBackdrop.classList.add('open');
  }

  function openEmptySlotPickerModal(dayKey, mealKey) {
    state.modalTargetSlot = { dayKey, mealKey };
    document.getElementById('selectPlanDay').value = dayKey;
    document.getElementById('selectPlanMeal').value = mealKey;

    switchView('exploreView');
    showToast(`เลือกเมนูที่ต้องการใส่ใน "${getMealLabel(mealKey)} วัน${getDayLabel(dayKey)}"`, '👇');
  }

  function getDayLabel(key) {
    const d = DAYS_ORDER.find(item => item.key === key);
    return d ? d.th : key;
  }

  function getMealLabel(key) {
    const m = MEAL_TYPES.find(item => item.key === key);
    return m ? m.th : key;
  }

  function closeAddPlanModal() {
    addToPlanModalBackdrop.classList.remove('open');
  }

  document.getElementById('btnCloseAddPlanModal').addEventListener('click', closeAddPlanModal);
  document.getElementById('btnCancelAddPlan').addEventListener('click', closeAddPlanModal);

  document.getElementById('btnConfirmAddToPlan').addEventListener('click', () => {
    if (!state.modalTargetSlot || !state.modalTargetSlot.recipeId) return;

    const day = document.getElementById('selectPlanDay').value;
    const meal = document.getElementById('selectPlanMeal').value;

    assignMealToPlan(day, meal, state.modalTargetSlot.recipeId);
    closeAddPlanModal();
  });

  // Backdrop click dismiss for all modals
  const ALL_MODALS = [
    pantryModalBackdrop,
    shoppingModalBackdrop,
    addToPlanModalBackdrop,
    authModalBackdrop,
    consultationModalBackdrop,
    adminDashboardModalBackdrop,
    profileModalBackdrop,
    changePasswordModalBackdrop,
    forgotModalBackdrop,
    supabaseConfigModalBackdrop
  ];

  ALL_MODALS.forEach(backdrop => {
    if (!backdrop) return;
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  // ESC key dismisses open modals & user dropdown
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      ALL_MODALS.forEach(m => {
        if (m) m.classList.remove('open');
      });
      const menu = document.getElementById('userDropdownMenu');
      if (menu) menu.classList.remove('open');
    }
  });

  // =========================================================================
  // 12. SUPABASE CONFIGURATION MODAL HANDLERS
  // =========================================================================
  function openSupabaseModal() {
    if (!supabaseConfigModalBackdrop) return;
    hideAuthAlert('supabaseAlertBox');

    const isConnected = window.SupabaseService && window.SupabaseService.isConfigured();
    const statusCard = document.getElementById('supabaseStatusCard');
    const statusText = document.getElementById('supabaseStatusText');
    const statusDesc = document.getElementById('supabaseStatusDesc');

    if (isConnected) {
      const cfg = window.SupabaseService.getConfig();
      if (statusCard) statusCard.classList.remove('disconnected');
      if (statusText) statusText.textContent = `🟢 เชื่อมต่อกับ Supabase สำเร็จ (${cfg.url})`;
      if (statusDesc) statusDesc.textContent = 'ฐานข้อมูล Supabase PostgreSQL และระบบ Authentication พร้อมใช้งานเต็มรูปแบบ 🚀';
    } else {
      if (statusCard) statusCard.classList.add('disconnected');
      if (statusText) statusText.textContent = '🟡 ยังไม่ได้เชื่อมต่อ Supabase';
      if (statusDesc) statusDesc.textContent = 'กรุณากรอก Supabase URL และ Anon Key ด้านล่างนี้เพื่อเปิดใช้งาน Cloud Database และ Auth';
    }

    // Populate current config if available
    if (window.SupabaseService) {
      const cfg = window.SupabaseService.getConfig();
      const urlEl = document.getElementById('sbUrl');
      const keyEl = document.getElementById('sbAnonKey');
      if (urlEl) urlEl.value = cfg.url || '';
      if (keyEl) keyEl.value = cfg.anonKey || '';
    }

    supabaseConfigModalBackdrop.classList.add('open');
  }

  function closeSupabaseModal() {
    if (supabaseConfigModalBackdrop) {
      supabaseConfigModalBackdrop.classList.remove('open');
    }
  }

  if (btnOpenSupabaseModal) {
    btnOpenSupabaseModal.addEventListener('click', openSupabaseModal);
  }
  if (btnCloseSupabaseModal) {
    btnCloseSupabaseModal.addEventListener('click', closeSupabaseModal);
  }

  // Parse & Save Supabase Config
  const formSupabaseConfig = document.getElementById('formSupabaseConfig');
  if (formSupabaseConfig) {
    formSupabaseConfig.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAuthAlert('supabaseAlertBox');

      const pasteText = (document.getElementById('sbConfigPaste') ? document.getElementById('sbConfigPaste').value : '').trim();
      let newConfig = {};

      if (pasteText) {
        try {
          if (pasteText.startsWith('{') && pasteText.endsWith('}')) {
            const parsed = JSON.parse(pasteText);
            newConfig.url = parsed.url || parsed.supabaseUrl || '';
            newConfig.anonKey = parsed.anonKey || parsed.supabaseKey || parsed.key || '';
          } else {
            // Regex match createClient('https://...', 'eyJ...') or url = '...'
            const urlMatch = pasteText.match(/https?:\/\/[a-zA-Z0-9.-]+\.supabase\.co/);
            const keyMatch = pasteText.match(/eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/);

            if (urlMatch) newConfig.url = urlMatch[0];
            if (keyMatch) newConfig.anonKey = keyMatch[0];
          }
        } catch (err) {
          console.warn('Could not parse paste text, will check manual fields');
        }
      }

      // Merge manual fields if provided
      const mUrl = document.getElementById('sbUrl') ? document.getElementById('sbUrl').value.trim() : '';
      const mKey = document.getElementById('sbAnonKey') ? document.getElementById('sbAnonKey').value.trim() : '';

      if (mUrl) newConfig.url = mUrl;
      if (mKey) newConfig.anonKey = mKey;

      if (!newConfig.url || !newConfig.anonKey) {
        showAuthAlert('supabaseAlertBox', 'error', 'กรุณาระบุ Supabase URL และ Anon Key ให้ครบถ้วนค่ะ');
        return;
      }

      const ok = window.SupabaseService.saveConfig(newConfig);
      if (ok) {
        updateSupabaseHeaderStatus();
        setupSupabaseAuthListener();
        showAuthAlert('supabaseAlertBox', 'success', 'บันทึกและเชื่อมต่อกับ Supabase เรียบร้อยแล้ว! 🚀');
        showToast('เชื่อมต่อ Supabase สำเร็จ! ฐานข้อมูลพร้อมใช้งานแล้ว', '⚡');
        setTimeout(() => {
          closeSupabaseModal();
        }, 1200);
      } else {
        showAuthAlert('supabaseAlertBox', 'error', 'บันทึกสำเร็จ แต่การเริ่มทำงาน Supabase Client ล้มเหลว กรุณาตรวจสอบ URL และ Key อีกครั้ง');
      }
    });
  }

  // Test Supabase Connection Button
  const btnTestSupabase = document.getElementById('btnTestSupabase');
  if (btnTestSupabase) {
    btnTestSupabase.addEventListener('click', async () => {
      setButtonLoading(btnTestSupabase, true);
      const res = await window.SupabaseService.testConnection();
      setButtonLoading(btnTestSupabase, false, 'ทดสอบการเชื่อมต่อ');
      if (res.success) {
        showAuthAlert('supabaseAlertBox', 'success', res.message);
      } else {
        showAuthAlert('supabaseAlertBox', 'error', res.message);
      }
    });
  }

  // Clear Supabase Config Button
  const btnClearSupabaseConfig = document.getElementById('btnClearSupabaseConfig');
  if (btnClearSupabaseConfig) {
    btnClearSupabaseConfig.addEventListener('click', () => {
      if (confirm('คุณต้องการล้างค่าการเชื่อมต่อ Supabase ใช่หรือไม่?')) {
        window.SupabaseService.clearConfig();
        if (document.getElementById('sbConfigPaste')) document.getElementById('sbConfigPaste').value = '';
        if (document.getElementById('sbUrl')) document.getElementById('sbUrl').value = '';
        if (document.getElementById('sbAnonKey')) document.getElementById('sbAnonKey').value = '';
        updateSupabaseHeaderStatus();
        showAuthAlert('supabaseAlertBox', 'info', 'ล้างการตั้งค่า Supabase เรียบร้อยแล้ว');
      }
    });
  }

  // Copy SQL Script Button
  const btnCopySql = document.getElementById('btnCopySql');
  if (btnCopySql) {
    btnCopySql.addEventListener('click', () => {
      const codeEl = document.getElementById('supabaseSqlCode');
      const code = codeEl ? codeEl.textContent : '';
      navigator.clipboard.writeText(code).then(() => {
        showToast('คัดลอก SQL Script สำหรับ Supabase เรียบร้อยแล้ว 📋', '✨');
      }).catch(() => {
        showToast('ไม่สามารถคัดลอกได้อัตโนมัติ กรุณาไฮไลต์แล้วกด Ctrl+C', '⚠️');
      });
    });
  }

  // =========================================================================
  // 13. INITIALIZATION
  // =========================================================================
  function init() {
    checkAuthStatus();
    renderRecipeGrid();
    renderDraggableSidebarList();
    renderDaySelectorPills();
    renderWeeklyTable();
    updateNutritionSummary();
    updateTotalMealCountBadge();
    updateShoppingBadgeCount();
  }

  init();

});
