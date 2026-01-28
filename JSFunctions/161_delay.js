/**
 * Delay Utility
 */

/**
 * Returns a promise that resolves after delay
 * @param {number} ms 
 * @returns {Promise}
 */
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = { delay };
