/**
 * Pluck Utility
 */

/**
 * Extract value from list of objects
 * @param {Array} collection 
 * @param {string} key 
 * @returns {Array} Array of values
 */
function pluck(collection, key) {
  return collection.map(item => item[key]);
}

module.exports = { pluck };
