/**
 * Simple LRU Cache
 */

class LRUCache {
  constructor(limit = 10) {
    this.limit = limit;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return undefined;
    
    // Refresh item
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  set(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    
    this.cache.set(key, value);
    if (this.cache.size > this.limit) {
      // Remove oldest (first item in Map)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}

module.exports = LRUCache;
