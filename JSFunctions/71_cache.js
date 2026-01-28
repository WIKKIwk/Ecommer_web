/**
 * Simple Memory Cache with TTL
 */

class Cache {
  constructor() {
    this.store = new Map();
  }

  set(key, value, ttl = 60000) {
    this.store.set(key, {
      value,
      expiry: Date.now() + ttl
    });
  }

  get(key) {
    const item = this.store.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.store.delete(key);
      return null;
    }
    
    return item.value;
  }

  delete(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

module.exports = Cache;
