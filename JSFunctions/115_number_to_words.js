/**
 * Number to Words (Simplified)
 */

/**
 * Convert number to words (0-999)
 * @param {number} n 
 * @returns {string}
 */
function numberToWords(n) {
    if (n === 0) return 'zero';

    const units = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

    if (n < 20) return units[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 ? '-' + units[n % 10] : '');
    if (n < 1000) return units[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + numberToWords(n % 100) : '');

    return 'Number too large for simplified version';
}

module.exports = { numberToWords };
