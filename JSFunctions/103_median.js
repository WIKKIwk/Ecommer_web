/**
 * Median Utility
 */

/**
 * Calculate median
 * @param {Array<number>} numbers 
 * @returns {number}
 */
function median(numbers) {
  if (!numbers || numbers.length === 0) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  
  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2;
  }
  
  return sorted[middle];
}

module.exports = { median };
