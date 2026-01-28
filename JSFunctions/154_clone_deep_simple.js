/**
 * JSON Clone Utility
 */

/**
 * Deep clone using JSON serialization (limited but fast)
 * @param {*} value 
 * @returns {*}
 */
function cloneDeepSimple(value) {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (e) {
    return null;
  }
}

module.exports = { cloneDeepSimple };
