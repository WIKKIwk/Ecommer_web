/**
 * Formatting utility functions
 */

/**
 * Format number as currency
 * @param {number} number 
 * @param {string} currency 
 * @returns {string} Formatted currency
 */
function formatCurrency(number, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(number);
}

/**
 * Format bytes to readable size
 * @param {number} bytes 
 * @param {number} decimals 
 * @returns {string}
 */
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Truncate string
 * @param {string} str 
 * @param {number} length 
 * @returns {string} Truncated string
 */
function truncate(str, length) {
    if (str.length <= length) return str;
    return str.slice(0, length) + '...';
}

module.exports = { formatCurrency, formatBytes, truncate };
