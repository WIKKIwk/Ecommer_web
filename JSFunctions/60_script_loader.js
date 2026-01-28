/**
 * Script Loader
 */

/**
 * Load external script
 * @param {string} src 
 * @returns {Promise}
 */
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

module.exports = { loadScript };
