/**
 * DOM utility functions
 */

/**
 * Query selector with error handling
 * @param {string} selector - CSS selector
 * @returns {Element|null} Element or null
 */
function $(selector) {
    return document.querySelector(selector);
}

/**
 * Query all with array return
 * @param {string} selector - CSS selector
 * @returns {Array} Array of elements
 */
function $$(selector) {
    return Array.from(document.querySelectorAll(selector));
}

/**
 * Add event listener with options
 * @param {Element} element - Target element
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 * @param {Object} options - Event options
 */
function on(element, event, handler, options = {}) {
    element.addEventListener(event, handler, options);
}

/**
 * Create element with properties
 * @param {string} tag - HTML tag
 * @param {Object} props - Element properties
 * @returns {Element} Created element
 */
function createElement(tag, props = {}) {
    const element = document.createElement(tag);
    Object.assign(element, props);
    return element;
}

module.exports = { $, $$, on, createElement };
