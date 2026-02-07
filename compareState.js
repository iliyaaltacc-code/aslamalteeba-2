(() => {
  const storageKey = "aa_compare_selection";
  const limit = 3;

  const load = () => {
    try {
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.warn("Compare selection unavailable:", error);
      return [];
    }
  };

  const save = (ids) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(ids));
    } catch (error) {
      console.warn("Compare selection could not be saved:", error);
    }
  };

  const normalize = (ids, validIds = []) => {
    const validSet = new Set(validIds);
    return ids.filter((id, index, arr) => validSet.has(id) && arr.indexOf(id) === index);
  };

  window.CompareState = {
    storageKey,
    limit,
    load,
    save,
    normalize
  };
})();
