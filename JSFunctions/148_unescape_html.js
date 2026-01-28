/**
 * Unescape HTML Utility
 */

/**
 * Unescape HTML entities
 * @param {string} safe 
 * @returns {string} Unescaped string
 */
function unescapeHtml(safe) {
  return safe
         .replace(/&amp;/g, "&")
         .replace(/&lt;/g, "<")
         .replace(/&gt;/g, ">")
         .replace(/&quot;/g, "\"")
         .replace(/&#039;/g, "'");
}

module.exports = { unescapeHtml };
