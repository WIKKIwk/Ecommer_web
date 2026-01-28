/**
 * Once Utility
 */

/**
 * Ensure function is called only once
 * @param {Function} fn 
 * @returns {Function}
 */
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  }
}

module.exports = { once };
