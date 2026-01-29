/**
 * Task Runner
 */

class TaskRunner {
    constructor(concurrency = 3) {
        this.concurrency = concurrency;
        this.queue = [];
        this.running = 0;
    }

    push(task) {
        this.queue.push(task);
        this.run();
    }

    async run() {
        while (this.running < this.concurrency && this.queue.length > 0) {
            const task = this.queue.shift();
            this.running++;
            try {
                await task();
            } catch (e) {
                console.error('Task failed', e);
            } finally {
                this.running--;
                this.run();
            }
        }
    }
}

module.exports = TaskRunner;
