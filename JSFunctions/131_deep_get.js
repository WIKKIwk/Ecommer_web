/**
 * Deep Get
 */

/**
 * Safely get nested property
 * @param {Object} obj 
 * @param {string|Array} path 
 * @param {*} defaultValue 
 * @returns {*}
 */
function deepGet(obj, path, defaultValue) {
    if (!obj) return defaultValue;

    const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)]/g, '.$1').split('.');
    let result = obj;

    for (const key of keys) {
        if (result === null || result === undefined) return defaultValue;
        result = result[key];
    }

    return result === undefined ? defaultValue : result;
}

module.exports = { deepGet };
