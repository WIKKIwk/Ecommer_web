/**
 * Functional programming utilities
 */

/**
 * Compose functions (right to left)
 * @param {...Function} fns 
 * @returns {Function}
 */
const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);

/**
 * Pipe functions (left to right)
 * @param {...Function} fns 
 * @returns {Function}
 */
const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);

module.exports = { compose, pipe };
