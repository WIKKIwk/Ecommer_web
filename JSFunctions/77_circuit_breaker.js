/**
 * Circuit Breaker Pattern
 */

class CircuitBreaker {
    constructor(fn, failureThreshold = 3, cooldownMs = 5000) {
        this.fn = fn;
        this.failureThreshold = failureThreshold;
        this.cooldownMs = cooldownMs;

        this.failures = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF-OPEN
    }

    async exec(...args) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.cooldownMs) {
                this.state = 'HALF-OPEN';
            } else {
                throw new Error('Circuit is OPEN');
            }
        }

        try {
            const result = await this.fn(...args);
            if (this.state === 'HALF-OPEN') {
                this.state = 'CLOSED';
                this.failures = 0;
            }
            return result;
        } catch (e) {
            this.failures++;
            this.lastFailureTime = Date.now();
            if (this.failures >= this.failureThreshold) {
                this.state = 'OPEN';
            }
            throw e;
        }
    }
}

module.exports = CircuitBreaker;
