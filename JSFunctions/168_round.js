/**
 * Round Utility
 */

/**
 * Round number to precision
 * @param {number} number 
 * @param {number} precision 
 * @returns {number}
 */
function round(number, precision = 0) {
  const multiplier = Math.pow(10, precision);
  return Math.round(number * multiplier) / multiplier;
}

module.exports = { round };
