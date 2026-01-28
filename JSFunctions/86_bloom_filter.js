/**
 * Simple Bloom Filter
 */

class BloomFilter {
  constructor(size = 100) {
    this.size = size;
    this.store = new Array(size).fill(0);
  }

  hash(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
      hash = Math.abs(hash);
    }
    return hash % this.size;
  }

  hash2(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      hash = (hash * 33) ^ string.charCodeAt(i);
    }
    return Math.abs(hash) % this.size;
  }

  add(string) {
    this.store[this.hash(string)] = 1;
    this.store[this.hash2(string)] = 1;
  }

  contains(string) {
    return !!this.store[this.hash(string)] && !!this.store[this.hash2(string)];
  }
}

module.exports = BloomFilter;
