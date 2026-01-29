/**
 * Simple In-Memory Cache
 */

class Cache {
    constructor(ttl = 60000) { // 1 min default
        this.store = new Map();
        this.ttl = ttl;
    }

    set(key, value, ttl = this.ttl) {
        const expires = Date.now() + ttl;
        this.store.set(key, { value, expires });
    }

    get(key) {
        const item = this.store.get(key);
        if (!item) return null;

        if (Date.now() > item.expires) {
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
