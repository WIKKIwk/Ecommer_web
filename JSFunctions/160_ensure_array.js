/**
 * Ensure Array Utility
 */

/**
 * Ensure value is an array
 * @param {*} value 
 * @returns {Array}
 */
function ensureArray(value) {
  if (value === null || value === undefined) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

module.exports = { ensureArray };
