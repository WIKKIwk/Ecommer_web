/**
 * Custom Hash Map
 */

class HashMap {
    constructor() {
        this.buckets = [];
        this.size = 0;
    }

    hash(key) {
        let hash = 0;
        const str = String(key);
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash) % 100;
    }

    set(key, value) {
        const idx = this.hash(key);
        if (!this.buckets[idx]) this.buckets[idx] = [];

        // Check key exists
        for (let pair of this.buckets[idx]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }

        this.buckets[idx].push([key, value]);
        this.size++;
    }

    get(key) {
        const idx = this.hash(key);
        if (!this.buckets[idx]) return undefined;

        for (let pair of this.buckets[idx]) {
            if (pair[0] === key) return pair[1];
        }
        return undefined;
    }
}

module.exports = HashMap;
