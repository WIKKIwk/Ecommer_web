/**
 * Async utility functions
 */

/**
 * Sleep promise
 * @param {number} ms 
 * @returns {Promise}
 */
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry async function
 * @param {Function} fn 
 * @param {number} retries 
 * @returns {Promise}
 */
async function retry(fn, retries = 3) {
    try {
        return await fn();
    } catch (e) {
        if (retries === 0) throw e;
        return retry(fn, retries - 1);
    }
}

/**
 * Timeout promise
 * @param {Promise} promise 
 * @param {number} ms 
 * @returns {Promise}
 */
function timeout(promise, ms) {
    return Promise.race([
        promise,
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms))
    ]);
}

module.exports = { sleep, retry, timeout };
