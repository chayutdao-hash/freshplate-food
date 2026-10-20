/**
 * FreshPlate - Supabase Configuration & Services
 * Handles Supabase Client Initialization, Cloud PostgreSQL Database, and Authentication
 */

(function () {
  'use strict';

  // Storage key for Supabase settings in browser localStorage
  const STORAGE_KEY = 'freshplate_supabase_config';

  // Default configuration template
  const DEFAULT_CONFIG = {
    url: 'https://cylphndlcbunpecozagh.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bHBobmRsY2J1bnBlY296YWdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI1MTAzODQsImV4cCI6MjEwODA4NjM4NH0.SweJnGOf7xuR7GJYrEtBqJvZ93BgoeUtBsbD4mcc9YM'
  };

  // Validate configuration format
  function isConfigValid(cfg) {
    if (!cfg) return false;
    const url = (cfg.url || '').trim();
    const key = (cfg.anonKey || '').trim();
    return Boolean(
      url.startsWith('http://') || url.startsWith('https://')
    ) && key.length > 20;
  }

  // Load configuration from localStorage or default
  function loadStoredConfig() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return { ...DEFAULT_CONFIG, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Failed to parse stored Supabase config:', e);
    }
    return { ...DEFAULT_CONFIG };
  }

  let activeConfig = loadStoredConfig();
  let supabaseClient = null;

  // Initialize Supabase Client
  function initSupabase() {
    // Check if Supabase JS SDK is loaded
    const supabaseLib = window.supabase;
    if (!supabaseLib || typeof supabaseLib.createClient !== 'function') {
      console.warn('Supabase JS SDK not loaded yet. Make sure @supabase/supabase-js is loaded.');
      return false;
    }

    if (!isConfigValid(activeConfig)) {
      supabaseClient = null;
      return false;
    }

    try {
      supabaseClient = supabaseLib.createClient(activeConfig.url.trim(), activeConfig.anonKey.trim(), {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true
        }
      });
      console.log('⚡ Supabase initialized successfully. Endpoint:', activeConfig.url);
      return true;
    } catch (error) {
      console.error('Failed to initialize Supabase client:', error);
      supabaseClient = null;
      return false;
    }
  }

  // Save new configuration and re-initialize
  function saveConfig(newConfig) {
    try {
      activeConfig = {
        url: (newConfig.url || '').trim(),
        anonKey: (newConfig.anonKey || '').trim()
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activeConfig));
      return initSupabase();
    } catch (err) {
      console.error('Error saving Supabase config:', err);
      return false;
    }
  }

  // Clear stored configuration
  function clearConfig() {
    localStorage.removeItem(STORAGE_KEY);
    activeConfig = { ...DEFAULT_CONFIG };
    supabaseClient = null;
  }

  // Test Supabase Connection & Schema readiness
  async function testConnection() {
    if (!supabaseClient) {
      const ok = initSupabase();
      if (!ok || !supabaseClient) {
        return {
          success: false,
          message: 'กรุณากรอก Supabase URL และ Anon Key ให้ถูกต้องก่อนทดสอบค่ะ'
        };
      }
    }

    try {
      // Test querying the users table
      const { data, error, status } = await supabaseClient
        .from('users')
        .select('id', { count: 'exact', head: true });

      if (error) {
        // Table does not exist in PostgreSQL (PostgreSQL error code 42P01 or PostgREST code PGRST205)
        if (error.code === '42P01' || error.code === 'PGRST205' || status === 404) {
          return {
            success: true,
            needsSchema: true,
            message: '⚡ เชื่อมต่อ Supabase สำเร็จ! (ยังไม่พบตาราง users กรุณาคัดลอก SQL Script ด้านล่างไปรันใน Supabase SQL Editor นะคะ)'
          };
        }
        // Authentication or RLS issue
        if (status === 401 || status === 403) {
          return {
            success: false,
            message: `การยืนยันตัวตนล้มเหลว (Status ${status}): กรุณาตรวจสอบ Anon Key อีกครั้ง`
          };
        }
        return {
          success: false,
          message: 'Supabase ตอบกลับข้อความ: ' + (error.message || error.code)
        };
      }

      return {
        success: true,
        message: '⚡ เชื่อมต่อฐานข้อมูล Supabase PostgreSQL สำเร็จสมบูรณ์! พร้อมใช้งานเต็มรูปแบบ 🚀'
      };
    } catch (err) {
      return {
        success: false,
        message: 'เกิดข้อผิดพลาดในการเชื่อมต่อ: ' + (err.message || err)
      };
    }
  }

  // Sign In with Google via Supabase OAuth
  async function signInWithGoogle() {
    if (!supabaseClient) {
      const initialized = initSupabase();
      if (!initialized || !supabaseClient) {
        throw new Error('CONFIG_REQUIRED');
      }
    }

    const currentUrl = window.location.origin + window.location.pathname;
    try {
      const { data, error } = await supabaseClient.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: currentUrl,
          queryParams: {
            prompt: 'select_account'
          }
        }
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Supabase Google OAuth error:', error);
      throw error;
    }
  }

  // Sign Out
  async function signOut() {
    if (supabaseClient) {
      try {
        await supabaseClient.auth.signOut();
      } catch (err) {
        console.warn('Error signing out from Supabase:', err);
      }
    }
  }

  // =========================================================================
  // SUPABASE POSTGRESQL DATABASE METHODS
  // =========================================================================

  // 1. User Profile Management (public.users table)
  async function getUserProfile(uid) {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', uid)
        .maybeSingle();

      if (error) {
        console.warn('Supabase getUserProfile warning:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('Error fetching Supabase user profile:', err);
      return null;
    }
  }

  async function setUserProfile(uid, profileData) {
    if (!supabaseClient) return false;
    try {
      const row = {
        id: String(uid),
        name: profileData.name || 'ผู้ใช้งาน',
        email: profileData.email || '',
        photo_url: profileData.photoURL || profileData.photo_url || '',
        role: profileData.role || 'user',
        target_calories: Number(profileData.target_calories) || 2000,
        target_protein: Number(profileData.target_protein) || 130,
        target_carbs: Number(profileData.target_carbs) || 210,
        target_fat: Number(profileData.target_fat) || 65,
        health_goal: profileData.health_goal || 'รักษาสุขภาพทั่วไป',
        updated_at: new Date().toISOString()
      };

      const { error } = await supabaseClient
        .from('users')
        .upsert(row, { onConflict: 'id' });

      if (error) {
        console.error('Supabase setUserProfile error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error saving Supabase user profile:', err);
      return false;
    }
  }

  // 2. User Meal Plan & Saved Recipes (public.user_data table)
  async function getUserMealData(uid) {
    if (!supabaseClient) return null;
    try {
      const { data, error } = await supabaseClient
        .from('user_data')
        .select('*')
        .eq('user_id', String(uid))
        .maybeSingle();

      if (error || !data) return null;
      return {
        mealPlan: data.meal_plan,
        savedRecipes: data.saved_recipes
      };
    } catch (err) {
      console.warn('Error fetching Supabase user meal data:', err);
      return null;
    }
  }

  async function saveUserMealData(uid, mealPlan, savedRecipes) {
    if (!supabaseClient) return false;
    try {
      const recipesArray = Array.isArray(savedRecipes)
        ? savedRecipes
        : Array.from(savedRecipes || []);

      const { error } = await supabaseClient
        .from('user_data')
        .upsert({
          user_id: String(uid),
          meal_plan: mealPlan,
          saved_recipes: recipesArray,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });

      if (error) {
        console.warn('Supabase saveUserMealData error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.warn('Error saving Supabase user meal data:', err);
      return false;
    }
  }

  // 3. Nutritionist Consultations System (public.consultations table)
  async function submitConsultation(consultation) {
    if (!supabaseClient) return { success: false, message: 'Supabase ยังไม่ได้เชื่อมต่อ' };
    try {
      const payload = {
        user_id: String(consultation.userId),
        user_name: consultation.userName || 'ผู้ใช้งาน',
        user_email: consultation.userEmail || '',
        user_photo: consultation.userPhoto || '',
        user_target_cal: Number(consultation.userTargetCal) || 2000,
        subject: consultation.subject,
        health_goal: consultation.health_goal || '',
        question: consultation.question,
        status: 'pending',
        admin_reply: '',
        created_at: new Date().toISOString()
      };

      const { data, error } = await supabaseClient
        .from('consultations')
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error('Supabase submitConsultation error:', error);
        return { success: false, message: error.message || 'ส่งคำถามไม่สำเร็จ' };
      }

      return {
        success: true,
        id: data ? data.id : Date.now(),
        message: 'ส่งคำถามถึงนักโภชนาการในระบบ Supabase เรียบร้อยแล้วค่ะ 🌿'
      };
    } catch (err) {
      console.error('Error submitting consultation to Supabase:', err);
      return { success: false, message: err.message || 'ส่งคำถามไม่สำเร็จ' };
    }
  }

  async function getUserConsultations(uid) {
    if (!supabaseClient) return [];
    try {
      const { data, error } = await supabaseClient
        .from('consultations')
        .select('*')
        .eq('user_id', String(uid))
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Supabase getUserConsultations error:', error);
        return [];
      }
      return data;
    } catch (err) {
      console.warn('Error getting Supabase user consultations:', err);
      return [];
    }
  }

  async function getAdminConsultations(filterStatus) {
    if (!supabaseClient) return [];
    try {
      let query = supabaseClient.from('consultations').select('*');
      if (filterStatus && filterStatus !== 'all') {
        query = query.eq('status', filterStatus);
      }
      const { data, error } = await query.order('created_at', { ascending: false });
      if (error || !data) {
        console.warn('Supabase getAdminConsultations error:', error);
        return [];
      }
      return data;
    } catch (err) {
      console.warn('Error getting Supabase admin consultations:', err);
      return [];
    }
  }

  async function replyConsultation(docId, replyText, adminName, adminId) {
    if (!supabaseClient) return false;
    try {
      const { error } = await supabaseClient
        .from('consultations')
        .update({
          admin_reply: replyText,
          admin_name: adminName,
          replied_by_admin_id: String(adminId),
          status: 'answered',
          replied_at: new Date().toISOString()
        })
        .eq('id', docId);

      if (error) {
        console.error('Supabase replyConsultation error:', error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error replying consultation via Supabase:', err);
      return false;
    }
  }

  async function getAdminUsers() {
    if (!supabaseClient) return [];
    try {
      const { data, error } = await supabaseClient
        .from('users')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data) {
        console.warn('Supabase getAdminUsers error:', error);
        return [];
      }
      return data;
    } catch (err) {
      console.warn('Error getting Supabase users directory:', err);
      return [];
    }
  }

  // Try auto-initialization
  if (typeof window !== 'undefined') {
    if (window.supabase) {
      initSupabase();
    } else {
      window.addEventListener('DOMContentLoaded', initSupabase);
    }
  }

  // Clean up legacy Firebase keys from localStorage if present
  try {
    if (localStorage.getItem('freshplate_firebase_config')) {
      localStorage.removeItem('freshplate_firebase_config');
    }
  } catch (e) {}

  // Expose to window
  window.SupabaseService = {
    getConfig: () => ({ ...activeConfig }),
    isConfigured: () => isConfigValid(activeConfig),
    init: initSupabase,
    getClient: () => supabaseClient,
    saveConfig,
    clearConfig,
    signInWithGoogle,
    signOut,
    testConnection,
    // Database operations
    getUserProfile,
    setUserProfile,
    getUserMealData,
    saveUserMealData,
    submitConsultation,
    getUserConsultations,
    getAdminConsultations,
    replyConsultation,
    getAdminUsers
  };

})();
