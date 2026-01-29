/**
 * Bloom Filter
 */

class BloomFilter {
    constructor(size = 100, hashCount = 3) {
        this.size = size;
        this.hashes = hashCount;
        this.buffer = new Array(size).fill(0);
    }

    add(value) {
        for (let i = 0; i < this.hashes; i++) {
            const idx = this.hash(value + i) % this.size;
            this.buffer[idx] = 1;
        }
    }

    has(value) {
        for (let i = 0; i < this.hashes; i++) {
            const idx = this.hash(value + i) % this.size;
            if (this.buffer[idx] === 0) return false;
        }
        return true;
    }

    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = (hash << 5) - hash + str.charCodeAt(i);
            hash |= 0;
        }
        return Math.abs(hash);
    }
}

module.exports = BloomFilter;
