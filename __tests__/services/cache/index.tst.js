import CacheService from "../../../services/CacheService";

describe("CacheService", () => {
  const key = "test_key";
  const value = { test: "value" };
  const CACHE_DURATION = 24 * 60 * 60 * 1000;
  afterEach(() => {
    localStorage.clear();
  });

  describe("get", () => {
    it("should return cached data if present and not expired", () => {
      const cacheDate = Date.now() - 60 * 60 * 1000; // cache is not expired
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(`${key}_cache_date`, JSON.stringify(cacheDate));
      expect(CacheService.get(key)).toEqual(value);
    });

    it("should return null if cache is expired", () => {
      const cacheDate = Date.now() - (CACHE_DURATION + 1); // cache is expired
      localStorage.setItem(key, JSON.stringify(value));
      localStorage.setItem(`${key}_cache_date`, JSON.stringify(cacheDate));
      expect(CacheService.get(key)).toBeNull();
    });

    it("should return null if cache is not present", () => {
      expect(CacheService.get(key)).toBeNull();
    });
  });

  describe("set", () => {
    it("should set the value in localStorage and cache date", () => {
      CacheService.set(key, value);
      const cachedData = JSON.parse(localStorage.getItem(key));
      const cacheDate = JSON.parse(localStorage.getItem(`${key}_cache_date`));
      expect(cachedData).toEqual(value);
      expect(cacheDate).toBeGreaterThan(Date.now() - 1000); // should be set to a recent date
    });
  });
});
