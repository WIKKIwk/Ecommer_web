/**
 * Viewport Utilities
 */

/**
 * Check if element is in viewport
 * @param {Element} el 
 * @returns {boolean}
 */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

module.exports = { isInViewport };
