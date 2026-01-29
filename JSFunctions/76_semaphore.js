/**
 * Semaphore Utility
 */

class Semaphore {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.active = 0;
        this.queue = [];
    }

    async acquire() {
        if (this.active < this.concurrency) {
            this.active++;
            return Promise.resolve();
        }

        return new Promise(resolve => this.queue.push(resolve));
    }

    release() {
        if (this.queue.length > 0) {
            const next = this.queue.shift();
            next();
        } else {
            this.active--;
        }
    }

    async use(fn) {
        await this.acquire();
        try {
            return await fn();
        } finally {
            this.release();
        }
    }
}

module.exports = Semaphore;
