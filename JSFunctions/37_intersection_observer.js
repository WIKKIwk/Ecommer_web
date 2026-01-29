/**
 * Intersection Observer Helper
 */

/**
 * Observe element visibility
 * @param {Element} element 
 * @param {Function} callback 
 * @param {Object} options 
 * @returns {IntersectionObserver} Observer instance
 */
function observeVisibility(element, callback, options = {}) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            callback(entry.isIntersecting, entry);
        });
    }, options);

    observer.observe(element);
    return observer;
}

module.exports = { observeVisibility };
