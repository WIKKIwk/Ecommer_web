/**
 * Mean Utility
 */

const { sum } = require('./169_sum');

/**
 * Calculate mean of numbers
 * @param {Array<number>} array 
 * @returns {number}
 */
function mean(array) {
  if (!array || array.length === 0) return 0;
  return sum(array) / array.length;
}

module.exports = { mean };
