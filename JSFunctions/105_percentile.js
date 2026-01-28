/**
 * Percentile Utility
 */

/**
 * Calculate percentile
 * @param {Array<number>} numbers 
 * @param {number} p Percentile (0-100)
 * @returns {number}
 */
function percentile(numbers, p) {
  if (!numbers || numbers.length === 0) return 0;
  
  const sorted = [...numbers].sort((a, b) => a - b);
  const index = (p / 100) * (sorted.length - 1);
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  
  if (upper >= sorted.length) return sorted[sorted.length - 1];
  
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

module.exports = { percentile };
