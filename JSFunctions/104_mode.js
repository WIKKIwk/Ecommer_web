/**
 * Mode Utility
 */

/**
 * Calculate mode
 * @param {Array<number>} numbers 
 * @returns {Array<number>}
 */
function mode(numbers) {
  if (!numbers || numbers.length === 0) return [];
  
  const counts = {};
  let maxFreq = 0;
  
  numbers.forEach(num => {
    counts[num] = (counts[num] || 0) + 1;
    if (counts[num] > maxFreq) maxFreq = counts[num];
  });
  
  return Object.keys(counts)
    .filter(num => counts[num] === maxFreq)
    .map(Number);
}

module.exports = { mode };
