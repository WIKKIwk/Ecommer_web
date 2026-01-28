/**
 * Regex based URL Parser
 */

/**
 * Parse URL components
 * @param {string} url 
 * @returns {Object|null}
 */
function parseUrl(url) {
  const pattern = /^(?:([a-z]+):)?\/\/([^\/:]+)(?::(\d+))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/i;
  const matches = url.match(pattern);
  
  if (!matches) return null;
  
  return {
    protocol: matches[1],
    host: matches[2],
    port: matches[3],
    path: matches[4],
    query: matches[5],
    hash: matches[6]
  };
}

module.exports = { parseUrl };
