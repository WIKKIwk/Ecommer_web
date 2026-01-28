/**
 * Map Object Values
 */

/**
 * Map values of an object
 * @param {Object} obj 
 * @param {Function} iteratee 
 * @returns {Object}
 */
function mapValues(obj, iteratee) {
  if (!obj) return {};
  
  return Object.keys(obj).reduce((acc, key) => {
    acc[key] = iteratee(obj[key], key, obj);
    return acc;
  }, {});
}

module.exports = { mapValues };
