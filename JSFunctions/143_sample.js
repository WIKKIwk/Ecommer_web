/**
 * Sample Utility
 */

/**
 * Gets a random element from collection.
 * @param {Array} array 
 * @returns {*} Random element
 */
function sample(array) {
  const length = array == null ? 0 : array.length;
  return length ? array[Math.floor(Math.random() * length)] : undefined;
}

module.exports = { sample };
