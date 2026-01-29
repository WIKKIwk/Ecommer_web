/**
 * Memoized Factorial
 */

const cache = {};

/**
 * Calculate factorial with memoization
 * @param {number} n 
 * @returns {number}
 */
function factorialMemo(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return 1;
    cache[n] = n * factorialMemo(n - 1);
    return cache[n];
}

module.exports = { factorialMemo };
