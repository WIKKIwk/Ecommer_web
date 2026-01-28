/**
 * Compose Async
 */

/**
 * Compose async functions (right to left)
 * @param {...Function} fns 
 * @returns {Function}
 */
const composeAsync = (...fns) => x => fns.reduceRight(async (p, f) => f(await p), Promise.resolve(x));

/**
 * Pipe async functions (left to right)
 * @param {...Function} fns 
 * @returns {Function}
 */
const pipeAsync = (...fns) => x => fns.reduce(async (p, f) => f(await p), Promise.resolve(x));

module.exports = { composeAsync, pipeAsync };
