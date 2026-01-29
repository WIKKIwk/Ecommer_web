/**
 * ID Generator
 */

/**
 * Generate UUID v4
 * @returns {string} UUID
 */
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

/**
 * Generate simple random ID
 * @param {number} length 
 * @returns {string} ID
 */
function randomId(length = 8) {
    return Math.random().toString(36).substr(2, length);
}

module.exports = { uuid, randomId };
