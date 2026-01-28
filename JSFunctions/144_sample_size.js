/**
 * Sample Size Utility
 */

/**
 * Gets n random elements at unique keys from collection.
 * @param {Array} array 
 * @param {number} n 
 * @returns {Array}
 */
function sampleSize(array, n = 1) {
  const length = array == null ? 0 : array.length;
  if (!length || n < 1) {
    return [];
  }
  n = n > length ? length : n;
  
  // Simple shuffle and slice
  const result = [...array];
  for (let i = 0; i < n; i++) {
    const rand = Math.floor(Math.random() * (length - i)) + i;
    [result[i], result[rand]] = [result[rand], result[i]];
  }
  return result.slice(0, n);
}

module.exports = { sampleSize };
