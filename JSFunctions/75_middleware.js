/**
 * Middleware Pattern
 */

class Middleware {
    constructor() {
        this.middlewares = [];
    }

    use(fn) {
        this.middlewares.push(fn);
    }

    async run(context) {
        const runner = async (index) => {
            if (index >= this.middlewares.length) return;

            const fn = this.middlewares[index];
            await fn(context, () => runner(index + 1));
        };

        await runner(0);
    }
}

module.exports = Middleware;
