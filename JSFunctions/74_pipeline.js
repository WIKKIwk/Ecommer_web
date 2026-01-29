/**
 * Pipeline Utility
 */

/**
 * Create a pipeline of functions
 * @param {...Function} fns 
 * @returns {Function}
 */
const pipeline = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

/**
 * Async pipeline
 * @param {...Function} fns 
 * @returns {Function}
 */
const asyncPipeline = (...fns) => (x) => fns.reduce(async (v, f) => f(await v), x);

module.exports = { pipeline, asyncPipeline };
