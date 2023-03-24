import LRUCache from "lru-cache";

class CacheService {
  static instance = null;

  cache = new LRUCache({ max: 100 });

  static getInstance() {
    if (!CacheService.instance) {
      CacheService.instance = new CacheService();
    }

    return CacheService.instance;
  }
}

export default CacheService;
