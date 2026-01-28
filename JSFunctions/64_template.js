/**
 * Simple Template Engine
 */

/**
 * Interpolate string with data
 * @param {string} template 
 * @param {Object} data 
 * @returns {string}
 */
function render(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    return data[key] !== undefined ? data[key] : match;
  });
}

module.exports = { render };
