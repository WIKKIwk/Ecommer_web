/**
 * Clamp Utility
 */

/**
 * Clamp number within inclusive range
 * @param {number} number 
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
function clamp(number, min, max) {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }
  return Math.min(Math.max(number, min), max);
}

module.exports = { clamp };
