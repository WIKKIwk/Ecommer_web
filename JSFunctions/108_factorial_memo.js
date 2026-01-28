/**
 * Memoized Factorial
 */

const memo = new Map();

/**
 * Calculate factorial with memoization
 * @param {number} n 
 * @returns {number}
 */
function factorialMemo(n) {
  if (n <= 1) return 1;
  if (memo.has(n)) return memo.get(n);
  
  const result = n * factorialMemo(n - 1);
  memo.set(n, result);
  return result;
}

module.exports = { factorialMemo };
