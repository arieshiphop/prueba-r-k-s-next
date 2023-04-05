const CACHE_DURATION = 24 * 60 * 60 * 1000;
class CacheService {
  static get(key) {
    const cachedData = JSON.parse(localStorage.getItem(key));
    const cacheDate = JSON.parse(localStorage.getItem(`${key}_cache_date`));
    if (cachedData && cacheDate && Date.now() - cacheDate < CACHE_DURATION) {
      return cachedData;
    } else {
      return null;
    }
  }

  static set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    localStorage.setItem(`${key}_cache_date`, JSON.stringify(Date.now()));
  }
}

export default CacheService;
