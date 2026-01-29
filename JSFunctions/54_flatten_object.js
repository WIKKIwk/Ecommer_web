/**
 * Flatten Object Utility
 */

/**
 * Flatten object to dot notation
 * @param {Object} obj 
 * @param {string} prefix 
 * @returns {Object} Flattened object
 */
function flattenObject(obj, prefix = '') {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '.' : '';
        if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
            Object.assign(acc, flattenObject(obj[k], pre + k));
        } else {
            acc[pre + k] = obj[k];
        }
        return acc;
    }, {});
}

module.exports = { flattenObject };
