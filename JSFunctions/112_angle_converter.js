/**
 * Angle Converters
 */

/**
 * Degrees to Radians
 * @param {number} deg 
 * @returns {number}
 */
function toRadians(deg) {
    return deg * (Math.PI / 180);
}

/**
 * Radians to Degrees
 * @param {number} rad 
 * @returns {number}
 */
function toDegrees(rad) {
    return rad * (180 / Math.PI);
}

module.exports = { toRadians, toDegrees };
