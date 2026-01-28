/**
 * Throttle Promise
 */

/**
 * Throttle async function
 * @param {Function} fn 
 * @param {number} limit 
 * @returns {Function}
 */
function throttlePromise(fn, limit) {
  let inThrottle;
  let lastResult;
  
  return async function(...args) {
    if (!inThrottle) {
      inThrottle = true;
      lastResult = await fn.apply(this, args);
      setTimeout(() => inThrottle = false, limit);
    }
    return lastResult;
  }
}

module.exports = { throttlePromise };
