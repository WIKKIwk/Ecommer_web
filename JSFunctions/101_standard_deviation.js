/**
 * Standard Deviation Utility
 */

/**
 * Calculate standard deviation
 * @param {Array<number>} numbers 
 * @returns {number}
 */
function standardDeviation(numbers) {
  if (!numbers || numbers.length === 0) return 0;
  
  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
  const squareDiffs = numbers.map(value => Math.pow(value - mean, 2));
  const avgSquareDiff = squareDiffs.reduce((a, b) => a + b, 0) / numbers.length;
  
  return Math.sqrt(avgSquareDiff);
}

module.exports = { standardDeviation };
