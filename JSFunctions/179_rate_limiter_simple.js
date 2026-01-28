/**
 * Simple Rate Limiter (Window)
 */

class RateLimiter {
  constructor(limit, windowMs) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.requests = [];
  }

  tryAcquire() {
    const now = Date.now();
    // Remove old requests
    this.requests = this.requests.filter(timestamp => now - timestamp < this.windowMs);
    
    if (this.requests.length < this.limit) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
}

module.exports = RateLimiter;
