/**
 * Unflatten Object Utility
 */

/**
 * Unflatten object from dot notation
 * @param {Object} obj 
 * @returns {Object} Nested object
 */
function unflattenObject(obj) {
  const result = {};
  for (const i in obj) {
    const keys = i.split('.');
    keys.reduce((acc, part, index) => {
      return acc[part] || (acc[part] = isNaN(Number(keys[index + 1])) ? keys.length - 1 === index ? obj[i] : {} : []);
    }, result);
  }
  return result;
}

module.exports = { unflattenObject };
