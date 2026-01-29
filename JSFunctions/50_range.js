/**
 * Range Utility
 */

/**
 * Python-like range function
 * @param {number} start 
 * @param {number} stop 
 * @param {number} step 
 * @returns {Array} Array of numbers
 */
function range(start, stop, step = 1) {
    if (typeof stop === 'undefined') {
        stop = start;
        start = 0;
    }

    const result = [];
    if (step > 0) {
        for (let i = start; i < stop; i += step) {
            result.push(i);
        }
    } else {
        for (let i = start; i > stop; i += step) {
            result.push(i);
        }
    }
    return result;
}

module.exports = { range };
