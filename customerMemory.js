// customerMemory.js — Customer Memory Layer
// Persists non-personal user preferences across visits
// Works across EN / FA / AR with graceful localStorage fallback

(() => {
  'use strict';

  const STORAGE_PREFIX = 'aa_';
  const STORAGE_KEYS = {
    LANGUAGE: 'aa_language',
    CURRENCY: 'aa_currency',
    BULK_MODE: 'aa_bulkMode',
    BRAND_FILTER: 'aa_brandFilter',
    WHATSAPP_USED: 'aa_whatsappUsed',
    BULK_QUOTE_USED: 'aa_bulkQuoteUsed',
    WELCOME_SHOWN: 'aa_welcomeShown',
    SLIDERS_DOCKED: 'aa_slidersDocked'
  };

  // Translations for welcome back message
  const TRANSLATIONS = {
    en: {
      welcomeBack: 'Welcome back — preferences restored',
      resetPreferences: 'Reset preferences'
    },
    fa: {
      welcomeBack: 'خوش آمدید — ترجیحات بازیابی شد',
      resetPreferences: 'بازنشانی ترجیحات'
    },
    ar: {
      welcomeBack: 'مرحبًا بعودتك — تم استعادة التفضيلات',
      resetPreferences: 'إعادة تعيين التفضيلات'
    }
  };

  // Detect current language from path or HTML lang attribute
  function detectLanguage() {
    const path = window.location.pathname;
    const htmlLang = document.documentElement.lang;
    
    if (path.startsWith('/ar') || htmlLang === 'ar') return 'ar';
    if (path.startsWith('/fa') || htmlLang === 'fa') return 'fa';
    return 'en';
  }

  // Safe localStorage wrapper with fallback
  const storage = {
    isAvailable: false,
    
    init() {
      try {
        const test = '__localStorage_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        this.isAvailable = true;
        return true;
      } catch (e) {
        console.warn('localStorage is not available:', e);
        return false;
      }
    },
    
    get(key) {
      if (!this.isAvailable) return null;
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('Error reading from localStorage:', e);
        return null;
      }
    },
    
    set(key, value) {
      if (!this.isAvailable) return false;
      try {
        localStorage.setItem(key, value);
        return true;
      } catch (e) {
        console.warn('Error writing to localStorage:', e);
        return false;
      }
    },
    
    remove(key) {
      if (!this.isAvailable) return false;
      try {
        localStorage.removeItem(key);
        return true;
      } catch (e) {
        console.warn('Error removing from localStorage:', e);
        return false;
      }
    },
    
    clear() {
      if (!this.isAvailable) return false;
      try {
        // Clear only customer memory preference keys (not cart)
        Object.values(STORAGE_KEYS).forEach(key => {
          localStorage.removeItem(key);
        });
        // Clear legacy bulk mode key
        localStorage.removeItem('bulkMode');
        return true;
      } catch (e) {
        console.warn('Error clearing localStorage:', e);
        return false;
      }
    }
  };

  // Customer Memory API
  window.CustomerMemory = {
    storage,
    
    init() {
      storage.init();
    },
    
    // Language preference
    getLanguage() {
      return storage.get(STORAGE_KEYS.LANGUAGE) || detectLanguage();
    },
    
    setLanguage(lang) {
      if (['en', 'fa', 'ar'].includes(lang)) {
        storage.set(STORAGE_KEYS.LANGUAGE, lang);
      }
    },
    
    // Currency preference
    getCurrency() {
      return storage.get(STORAGE_KEYS.CURRENCY) || 'USD';
    },
    
    setCurrency(currency) {
      if (['USD', 'AED'].includes(currency)) {
        storage.set(STORAGE_KEYS.CURRENCY, currency);
      }
    },
    
    // Bulk Mode preference
    getBulkMode() {
      const value = storage.get(STORAGE_KEYS.BULK_MODE);
      // Check legacy key as fallback
      const legacy = storage.get('bulkMode');
      return value === 'true' || legacy === 'true';
    },
    
    setBulkMode(enabled) {
      storage.set(STORAGE_KEYS.BULK_MODE, enabled ? 'true' : 'false');
      // Also set legacy key for backward compatibility
      storage.set('bulkMode', enabled ? 'true' : 'false');
    },
    
    // Brand filter preference
    getBrandFilter() {
      return storage.get(STORAGE_KEYS.BRAND_FILTER) || '';
    },
    
    setBrandFilter(brand) {
      if (brand) {
        storage.set(STORAGE_KEYS.BRAND_FILTER, brand);
      } else {
        storage.remove(STORAGE_KEYS.BRAND_FILTER);
      }
    },
    
    // Sliders docked preference
    getSlidersDocked() {
      const value = storage.get(STORAGE_KEYS.SLIDERS_DOCKED);
      return value === 'true';
    },
    
    setSlidersDocked(docked) {
      storage.set(STORAGE_KEYS.SLIDERS_DOCKED, docked ? 'true' : 'false');
    },
    
    // WhatsApp usage tracking
    hasUsedWhatsApp() {
      return storage.get(STORAGE_KEYS.WHATSAPP_USED) === 'true';
    },
    
    markWhatsAppUsed() {
      storage.set(STORAGE_KEYS.WHATSAPP_USED, 'true');
    },
    
    // Bulk quote usage tracking
    hasUsedBulkQuote() {
      return storage.get(STORAGE_KEYS.BULK_QUOTE_USED) === 'true';
    },
    
    markBulkQuoteUsed() {
      storage.set(STORAGE_KEYS.BULK_QUOTE_USED, 'true');
    },
    
    // Welcome message shown tracking
    wasWelcomeShown() {
      const shown = storage.get(STORAGE_KEYS.WELCOME_SHOWN);
      // Reset daily
      const today = new Date().toDateString();
      if (shown !== today) {
        storage.remove(STORAGE_KEYS.WELCOME_SHOWN);
        return false;
      }
      return true;
    },
    
    markWelcomeShown() {
      const today = new Date().toDateString();
      storage.set(STORAGE_KEYS.WELCOME_SHOWN, today);
    },
    
    // Check if user is returning (has any saved preferences)
    isReturningUser() {
      if (!storage.isAvailable) return false;
      
      return !!(
        storage.get(STORAGE_KEYS.CURRENCY) ||
        storage.get(STORAGE_KEYS.BULK_MODE) ||
        storage.get('bulkMode') || // Legacy
        storage.get(STORAGE_KEYS.BRAND_FILTER) ||
        storage.get(STORAGE_KEYS.WHATSAPP_USED) ||
        storage.get(STORAGE_KEYS.BULK_QUOTE_USED)
      );
    },
    
    // Reset all preferences
    resetAll() {
      storage.clear();
      // Optionally reload the page - caller should confirm first
      return true;
    },
    
    // Show welcome back notification
    showWelcomeBack() {
      const lang = detectLanguage();
      const isRTL = lang !== 'en';
      const text = TRANSLATIONS[lang];
      
      if (!this.isReturningUser() || this.wasWelcomeShown()) {
        return;
      }
      
      // Create notification element
      const notification = document.createElement('div');
      notification.className = 'customer-memory-welcome';
      notification.innerHTML = `
        <div class="cm-welcome-content">
          <span class="cm-welcome-icon">✓</span>
          <span class="cm-welcome-text">${text.welcomeBack}</span>
        </div>
      `;
      
      // Add styles
      const style = document.createElement('style');
      style.textContent = `
        .customer-memory-welcome {
          position: fixed;
          top: 80px;
          ${isRTL ? 'right: 20px' : 'left: 20px'};
          background: rgba(16, 185, 129, 0.95);
          color: #fff;
          padding: 12px 18px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 600;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 10000;
          animation: cm-slide-in 0.4s ease-out, cm-fade-out 0.4s ease-in 4.6s;
          direction: ${isRTL ? 'rtl' : 'ltr'};
          backdrop-filter: blur(8px);
        }
        
        .cm-welcome-content {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .cm-welcome-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          font-size: 12px;
        }
        
        @keyframes cm-slide-in {
          from {
            transform: translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        @keyframes cm-fade-out {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(notification);
      
      // Remove after 5 seconds
      setTimeout(() => {
        notification.remove();
        style.remove();
      }, 5000);
      
      // Mark as shown
      this.markWelcomeShown();
    },
    
    // Add reset button to page (optional, for user control)
    addResetButton() {
      const lang = detectLanguage();
      const isRTL = lang !== 'en';
      const text = TRANSLATIONS[lang];
      
      const button = document.createElement('button');
      button.className = 'customer-memory-reset';
      button.textContent = text.resetPreferences;
      button.title = text.resetPreferences;
      button.onclick = () => {
        if (confirm(text.resetPreferences + '?')) {
          this.resetAll();
          window.location.reload();
        }
      };
      
      const style = document.createElement('style');
      style.textContent = `
        .customer-memory-reset {
          position: fixed;
          bottom: 80px;
          ${isRTL ? 'left: 20px' : 'right: 20px'};
          background: rgba(255, 255, 255, 0.1);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          cursor: pointer;
          z-index: 9998;
          backdrop-filter: blur(8px);
          transition: all 0.2s;
        }
        
        .customer-memory-reset:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }
      `;
      
      document.head.appendChild(style);
      document.body.appendChild(button);
    }
  };

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.CustomerMemory.init();
    });
  } else {
    window.CustomerMemory.init();
  }
})();
