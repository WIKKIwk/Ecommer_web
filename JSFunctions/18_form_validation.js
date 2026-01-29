/**
 * Form Validation
 */

/**
 * Validate required field
 * @param {*} value 
 * @returns {boolean}
 */
function isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
}

/**
 * Validate min length
 * @param {string} value 
 * @param {number} min 
 * @returns {boolean}
 */
function minLength(value, min) {
    return value.length >= min;
}

/**
 * Validate password strength (simple)
 * @param {string} password 
 * @returns {boolean}
 */
function isStrongPassword(password) {
    // Min 8 chars, at least 1 number and 1 letter
    return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
}

module.exports = { isRequired, minLength, isStrongPassword };
