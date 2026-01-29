/**
 * Median Utility
 */

/**
 * Calculate median
 * @param {Array<number>} data 
 * @returns {number}
 */
function median(data) {
    if (!data || data.length === 0) return 0;

    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);

    return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
}

module.exports = { median };
