/**
 * Standard Deviation Utility
 */

/**
 * Calculate standard deviation
 * @param {Array<number>} data 
 * @returns {number}
 */
function standardDeviation(data) {
    if (!data || data.length === 0) return 0;

    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance = data.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / data.length;

    return Math.sqrt(variance);
}

module.exports = { standardDeviation };
