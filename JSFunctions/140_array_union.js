/**
 * Array Union
 */

/**
 * Get union of two arrays
 * @param {Array} arr1 
 * @param {Array} arr2 
 * @returns {Array} Unique elements from both
 */
function union(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}

module.exports = { union };
