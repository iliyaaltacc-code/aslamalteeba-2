(() => {
  'use strict';

  const STORAGE_KEY = 'aa_profile';
  const DEFAULT_PROFILE_ID = 'balanced';

  const profiles = {
    balanced: {
      id: 'balanced',
      label: 'Balanced',
      tagline: 'Everyday confidence for mixed UAE driving.',
      heroSubcopy: 'Balanced performance for daily commuting, weekend drives, and steady UAE reliability.',
      orderingWeights: {
        price: 0.2,
        noise: 0.2,
        treadLife: 0.2,
        wetGrip: 0.2,
        fuelEfficiency: 0.2
      },
      badgeRules: {
        label: 'Best all-round',
        className: 'bg-white/10 border border-white/10'
      },
      accentClass: 'text-emerald-300',
      defaultBrand: ''
    },
    cityquiet: {
      id: 'cityquiet',
      label: 'City & Quiet',
      tagline: 'Smoother commutes with calm, low-noise comfort.',
      heroSubcopy: 'Quiet, refined tires tuned for city traffic, tight turns, and smoother daily commutes.',
      orderingWeights: {
        price: 0.18,
        noise: 0.32,
        treadLife: 0.18,
        wetGrip: 0.16,
        fuelEfficiency: 0.16
      },
      badgeRules: {
        label: 'Quiet pick',
        className: 'bg-white/10 border border-white/10'
      },
      accentClass: 'text-sky-300',
      defaultBrand: 'Bridgestone'
    },
    highwayheat: {
      id: 'highwayheat',
      label: 'Highway & UAE Heat',
      tagline: 'Built for long runs, high heat, and steady endurance.',
      heroSubcopy: 'Heat-ready tires focused on highway stability, long wear, and steady fuel efficiency.',
      orderingWeights: {
        price: 0.16,
        noise: 0.14,
        treadLife: 0.3,
        wetGrip: 0.18,
        fuelEfficiency: 0.22
      },
      badgeRules: {
        label: 'Heat-ready',
        className: 'bg-white/10 border border-white/10'
      },
      accentClass: 'text-amber-300',
      defaultBrand: 'Bridgestone'
    },
    offroad: {
      id: 'offroad',
      label: 'Off-Road / A/T',
      tagline: 'Trail-focused picks for rugged, mixed-terrain adventures.',
      heroSubcopy: 'Trail-ready options prioritizing grip, durability, and confident traction on rough terrain.',
      orderingWeights: {
        price: 0.15,
        noise: 0.12,
        treadLife: 0.28,
        wetGrip: 0.3,
        fuelEfficiency: 0.15
      },
      badgeRules: {
        label: 'Trail pick',
        secondaryLabel: 'Trail-ready',
        className: 'bg-white/10 border border-white/10'
      },
      accentClass: 'text-lime-300',
      defaultBrand: 'Duraturn'
    }
  };

  const listeners = new Set();
  let activeProfileId = DEFAULT_PROFILE_ID;

  const safeStorage = {
    get() {
      try {
        return localStorage.getItem(STORAGE_KEY);
      } catch (error) {
        return null;
      }
    },
    set(value) {
      try {
        localStorage.setItem(STORAGE_KEY, value);
      } catch (error) {
        return;
      }
    }
  };

  const resolveProfileId = (profileId) => {
    if (profileId && profiles[profileId]) {
      return profileId;
    }
    return DEFAULT_PROFILE_ID;
  };

  const initializeProfile = () => {
    const stored = safeStorage.get();
    activeProfileId = resolveProfileId(stored);
  };

  const getProfile = () => profiles[activeProfileId];

  const setProfile = (profileId) => {
    const nextId = resolveProfileId(profileId);
    if (nextId === activeProfileId) {
      return getProfile();
    }
    activeProfileId = nextId;
    safeStorage.set(activeProfileId);
    const profile = getProfile();
    listeners.forEach((listener) => listener(profile));
    return profile;
  };

  const subscribe = (listener) => {
    if (typeof listener !== 'function') {
      return () => {};
    }
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const runProfileTransition = (callback) => {
    const overlay = document.getElementById('page-transition');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!overlay || prefersReducedMotion) {
      callback();
      return;
    }

    overlay.classList.add('is-active');

    window.setTimeout(() => {
      callback();
      window.setTimeout(() => {
        overlay.classList.remove('is-active');
      }, 140);
    }, 120);
  };

  initializeProfile();

  window.Personalization = {
    profiles,
    getProfiles: () => Object.values(profiles),
    getProfile,
    setProfile,
    subscribe,
    runProfileTransition
  };
})();
