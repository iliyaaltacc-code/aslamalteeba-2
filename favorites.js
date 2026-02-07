(() => {
  'use strict';

  const STORAGE_KEY = 'aa_favorites_v1';
  const listeners = new Set();
  let memoryCache = [];

  const localAdapter = {
    read() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (error) {
        console.warn('Favorites localStorage read failed:', error);
        return [];
      }
    },
    write(items) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.warn('Favorites localStorage write failed:', error);
      }
    }
  };

  let adapter = localAdapter;

  const normalizeProduct = (product = {}) => {
    const id = product.id || product.sku || `${product.name || 'item'}-${product.size || 'default'}`;
    return {
      id,
      name: product.name || 'Untitled item',
      brand: product.brand || '',
      size: product.size || '',
      price: typeof product.price === 'number' ? product.price : null,
      img: product.img || '',
      desc: product.desc || ''
    };
  };

  const readFavorites = () => {
    const stored = adapter.read();
    if (Array.isArray(stored)) {
      memoryCache = stored.filter(item => item && item.id);
    }
    return memoryCache;
  };

  const writeFavorites = (items) => {
    memoryCache = items;
    adapter.write(items);
  };

  const notify = () => {
    const snapshot = memoryCache.map(item => ({ ...item }));
    listeners.forEach(listener => listener(snapshot));
  };

  const ensureLoaded = () => {
    if (!memoryCache.length) {
      readFavorites();
    }
  };

  const favoritesStore = {
    setAdapter(newAdapter) {
      if (!newAdapter || typeof newAdapter.read !== 'function' || typeof newAdapter.write !== 'function') {
        console.warn('Favorites adapter must implement read() and write()');
        return;
      }
      adapter = newAdapter;
      readFavorites();
      notify();
    },
    getItems() {
      ensureLoaded();
      return memoryCache.map(item => ({ ...item }));
    },
    isFavorite(id) {
      ensureLoaded();
      return memoryCache.some(item => item.id === id);
    },
    add(product) {
      ensureLoaded();
      const item = normalizeProduct(product);
      if (!memoryCache.some(existing => existing.id === item.id)) {
        const next = [...memoryCache, item];
        writeFavorites(next);
        notify();
      }
      return item;
    },
    remove(id) {
      ensureLoaded();
      const next = memoryCache.filter(item => item.id !== id);
      if (next.length !== memoryCache.length) {
        writeFavorites(next);
        notify();
      }
    },
    toggle(product) {
      ensureLoaded();
      const item = normalizeProduct(product);
      const exists = memoryCache.some(existing => existing.id === item.id);
      if (exists) {
        favoritesStore.remove(item.id);
        return { added: false, item };
      }
      favoritesStore.add(item);
      return { added: true, item };
    },
    subscribe(listener) {
      if (typeof listener !== 'function') return () => {};
      listeners.add(listener);
      listener(favoritesStore.getItems());
      return () => listeners.delete(listener);
    },
    clear() {
      writeFavorites([]);
      notify();
    }
  };

  const messages = {
    en: {
      added: 'Added to favorites',
      removed: 'Removed from favorites'
    },
    ar: {
      added: 'تمت الإضافة إلى المفضلة',
      removed: 'تمت الإزالة من المفضلة'
    },
    fa: {
      added: 'به علاقه‌مندی‌ها اضافه شد',
      removed: 'از علاقه‌مندی‌ها حذف شد'
    }
  };

  const detectLocale = () => {
    const lang = document.documentElement.lang || 'en';
    if (lang.startsWith('ar')) return 'ar';
    if (lang.startsWith('fa')) return 'fa';
    return 'en';
  };

  const createController = (options = {}) => {
    const locale = options.locale || detectLocale();
    const labels = messages[locale] || messages.en;
    const prefersReducedMotion = window.matchMedia
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

    return {
      favorites: [],
      favoriteIdSet: new Set(),
      favoriteCount: 0,
      favoriteAnimations: {},
      toasts: [],
      prefersReducedMotion,
      initFavorites() {
        favoritesStore.subscribe(items => {
          this.favorites = items;
          this.favoriteIdSet = new Set(items.map(item => item.id));
          this.favoriteCount = items.length;
        });
      },
      isFavorite(id) {
        return this.favoriteIdSet.has(id);
      },
      toggleFavorite(product) {
        const result = favoritesStore.toggle(product);
        if (!this.prefersReducedMotion) {
          this.favoriteAnimations = { ...this.favoriteAnimations, [product.id]: true };
          setTimeout(() => {
            this.favoriteAnimations = { ...this.favoriteAnimations, [product.id]: false };
          }, 210);
        }
        this.addToast(result.added ? labels.added : labels.removed);
        return result;
      },
      addToast(message) {
        const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        this.toasts = [...this.toasts, { id, message }];
        setTimeout(() => {
          this.toasts = this.toasts.filter(toast => toast.id !== id);
        }, 2200);
      }
    };
  };

  window.FavoritesStore = favoritesStore;
  window.FavoritesUI = {
    detectLocale,
    messages,
    createController
  };
})();
