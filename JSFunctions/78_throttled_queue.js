/**
 * Throttled Queue
 */

class ThrottledQueue {
  constructor(limit, interval) {
    this.limit = limit;
    this.interval = interval;
    this.queue = [];
    this.lastRun = 0;
    this.count = 0;
  }

  add(fn) {
    this.queue.push(fn);
    this.process();
  }

  process() {
    const now = Date.now();
    if (now - this.lastRun > this.interval) {
      this.count = 0;
      this.lastRun = now;
    }

    while (this.queue.length > 0 && this.count < this.limit) {
      const fn = this.queue.shift();
      fn();
      this.count++;
    }

    if (this.queue.length > 0) {
      const wait = this.interval - (now - this.lastRun);
      setTimeout(() => this.process(), Math.max(0, wait));
    }
  }
}

module.exports = ThrottledQueue;
