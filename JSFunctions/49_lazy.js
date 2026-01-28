/**
 * Lazy Value Utility
 */

class Lazy {
  constructor(supplier) {
    this.supplier = supplier;
    this.value = undefined;
    this.initialized = false;
  }

  get() {
    if (!this.initialized) {
      this.value = this.supplier();
      this.initialized = true;
    }
    return this.value;
  }
}

module.exports = Lazy;
