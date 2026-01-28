/**
 * Deep Get Utility
 */

/**
 * Get nested property
 * @param {Object} obj 
 * @param {string|Array} path 
 * @param {*} defaultValue 
 * @returns {*}
 */
function get(obj, path, defaultValue) {
  if (!obj) return defaultValue;
  
  const keys = Array.isArray(path) ? path : path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue;
    result = result[key];
  }
  
  return result === undefined ? defaultValue : result;
}

module.exports = { get };
