/**
 * Throttle Promise
 */

/**
 * Throttle a function that returns a promise
 * @param {Function} fn 
 * @param {number} limit 
 * @returns {Function}
 */
function throttlePromise(fn, limit) {
    let lastRun = 0;
    let pendingPromise;

    return async function (...args) {
        const now = Date.now();
        if (now - lastRun >= limit) {
            lastRun = now;
            pendingPromise = fn.apply(this, args);
        }
        return pendingPromise;
    }
}

module.exports = { throttlePromise };
