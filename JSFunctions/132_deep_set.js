/**
 * Deep Set
 */

/**
 * Safely set nested property
 * @param {Object} obj 
 * @param {string|Array} path 
 * @param {*} value 
 * @returns {Object} Modified object
 */
function deepSet(obj, path, value) {
    if (!obj) return obj;

    const keys = Array.isArray(path) ? path : path.replace(/\[(\d+)]/g, '.$1').split('.');
    let current = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i];
        if (!(key in current)) {
            // Determine if next key is index or prop
            current[key] = /^\d+$/.test(keys[i + 1]) ? [] : {};
        }
        current = current[key];
    }

    current[keys[keys.length - 1]] = value;
    return obj;
}

module.exports = { deepSet };
