/**
 * Word Wrap Utility
 */

/**
 * Wrap text to line length
 * @param {string} text 
 * @param {number} width 
 * @returns {string} Wrapped text
 */
function wordWrap(text, width) {
    if (!text) return '';
    const regex = new RegExp(\`(?![^\\n]{1,\${width}}$)([^\\n]{1,\${width}})\\s\`, 'g');
  return text.replace(regex, '$1\n');
}

module.exports = { wordWrap };
