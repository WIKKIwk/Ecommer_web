/**
 * Unique By Key
 */

/**
 * Get unique objects by key
 * @param {Array} arr 
 * @param {string|Function} key 
 * @returns {Array}
 */
function uniqueBy(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const k = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(k)) {
      return false;
    }
    seen.add(k);
    return true;
  });
}

module.exports = { uniqueBy };
