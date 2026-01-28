/**
 * Mask String Utility
 */

/**
 * Mask part of a string
 * @param {string} str 
 * @param {number} visibleCount Number of visible characters at end
 * @param {string} maskChar 
 * @returns {string} Masked string
 */
function maskString(str, visibleCount = 4, maskChar = '*') {
  if (!str) return '';
  const len = str.length;
  if (len <= visibleCount) return str;
  return maskChar.repeat(len - visibleCount) + str.slice(-visibleCount);
}

module.exports = { maskString };
