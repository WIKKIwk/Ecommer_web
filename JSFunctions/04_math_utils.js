/**
 * Math utility functions
 */

/**
 * Generate random number in range
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {number} Random number
 */
function randomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if number is prime
 * @param {number} num - Number to check
 * @returns {boolean} True if prime
 */
function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

/**
 * Calculate factorial
 * @param {number} n - Number
 * @returns {number} Factorial
 */
function factorial(n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

module.exports = { randomInRange, isPrime, factorial };
