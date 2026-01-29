/**
 * Variance Utility
 */

/**
 * Calculate variance
 * @param {Array<number>} data 
 * @returns {number}
 */
function variance(data) {
    if (!data || data.length === 0) return 0;

    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    return data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;
}

module.exports = { variance };
