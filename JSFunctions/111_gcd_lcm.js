/**
 * GCD and LCM Utilities
 */

/**
 * Greatest Common Divisor
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Least Common Multiple
 * @param {number} a 
 * @param {number} b 
 * @returns {number}
 */
function lcm(a, b) {
    if (a === 0 || b === 0) return 0;
    return Math.abs(a * b) / gcd(a, b);
}

module.exports = { gcd, lcm };
