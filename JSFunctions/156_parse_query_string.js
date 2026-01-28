/**
 * Parse Query String
 */

/**
 * Parse query string to object
 * @param {string} queryString 
 * @returns {Object}
 */
function parseQueryString(queryString) {
  if (!queryString) return {};
  if (queryString.startsWith('?')) queryString = queryString.slice(1);
  
  return queryString.split('&').reduce((acc, pair) => {
    const [key, value] = pair.split('=').map(decodeURIComponent);
    if (key) acc[key] = value;
    return acc;
  }, {});
}

module.exports = { parseQueryString };
