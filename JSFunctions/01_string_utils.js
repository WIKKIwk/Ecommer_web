/**
 * String utility functions
 */

/**
 * Reverse a string
 * @param {string} str - String to reverse
 * @returns {string} Reversed string
 */
function reverseString(str) {
    return str.split('').reverse().join('');
}

/**
 * Check if string is palindrome
 * @param {string} str - String to check
 * @returns {boolean} True if palindrome
 */
function isPalindrome(str) {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Count words in string
 * @param {string} str - String to count
 * @returns {number} Word count
 */
function countWords(str) {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
}

module.exports = { reverseString, isPalindrome, countWords };
