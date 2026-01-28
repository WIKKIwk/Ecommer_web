/**
 * Stringify Query String
 */

/**
 * Convert object to query string
 * @param {Object} params 
 * @returns {string}
 */
function stringifyQueryString(params) {
  if (!params) return '';
  
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

module.exports = { stringifyQueryString };
