/**
 * Object Pick Utility
 */

/**
 * Pick keys from object
 * @param {Object} obj 
 * @param {Array<string>} keys 
 * @returns {Object}
 */
function pick(obj, keys) {
  if (!obj) return {};
  
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

module.exports = { pick };
