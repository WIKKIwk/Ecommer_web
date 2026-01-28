/**
 * In Range Utility
 */

/**
 * Check if number is in range
 * @param {number} number 
 * @param {number} start 
 * @param {number} end 
 * @returns {boolean}
 */
function inRange(number, start, end = null) {
  if (end === null) {
    end = start;
    start = 0;
  }
  return number >= Math.min(start, end) && number < Math.max(start, end);
}

module.exports = { inRange };
