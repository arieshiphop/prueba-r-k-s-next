import LRUCache from "lru-cache";
import CacheService from "../../../services/CacheService";

describe("CacheService", () => {
  it("should return the same instance when getInstance is called multiple times", () => {
    const instance1 = CacheService.getInstance();
    const instance2 = CacheService.getInstance();
    expect(instance1).toBe(instance2);
  });

  it("should have a cache object of type LRUCache", () => {
    const instance = CacheService.getInstance();
    expect(instance.cache).toBeInstanceOf(LRUCache);
  });

  it("should have a cache object with a maximum size of 100", () => {
    const instance = CacheService.getInstance();
    expect(instance.cache.max).toBe(100);
  });
});
