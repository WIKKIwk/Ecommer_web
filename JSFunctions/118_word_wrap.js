/**
 * Word Wrap
 */

/**
 * Wrap text to key width
 * @param {string} str 
 * @param {number} width 
 * @returns {string}
 */
function wordWrap(str, width = 50) {
  if (!str) return str;
  
  const regex = new RegExp(`(?![^\n]{1,${width}}$)([^\n]{1,${width}})\s`, 'g');
  return str.replace(regex, '\n');
}

module.exports = { wordWrap };
