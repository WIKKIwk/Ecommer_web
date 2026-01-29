/**
 * Object utility functions
 */

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Merge multiple objects
 * @param {...Object} objects - Objects to merge
 * @returns {Object} Merged object
 */
function mergeObjects(...objects) {
    return Object.assign({}, ...objects);
}

/**
 * Pick specific keys from object
 * @param {Object} obj - Source object
 * @param {Array} keys - Keys to pick
 * @returns {Object} Object with picked keys
 */
function pickKeys(obj, keys) {
    return keys.reduce((result, key) => {
        if (key in obj) {
            result[key] = obj[key];
        }
        return result;
    }, {});
}

module.exports = { deepClone, mergeObjects, pickKeys };
