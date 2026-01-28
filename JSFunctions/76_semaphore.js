/**
 * Async Semaphore
 */

class Semaphore {
  constructor(max) {
    this.max = max;
    this.value = 0;
    this.queue = [];
  }

  async acquire() {
    if (this.value < this.max) {
      this.value++;
      return; // Lock acquired
    }

    await new Promise(resolve => this.queue.push(resolve));
  }

  release() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    } else {
      this.value--;
    }
  }

  async run(fn) {
    await this.acquire();
    try {
      return await fn();
    } finally {
      this.release();
    }
  }
}

module.exports = Semaphore;
