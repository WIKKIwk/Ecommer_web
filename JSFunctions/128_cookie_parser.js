/**
 * Cookie Parser
 */

/**
 * Parse cookie string to object
 * @param {string} cookieStr 
 * @returns {Object}
 */
function parseCookies(cookieStr) {
  if (!cookieStr) return {};
  
  return cookieStr.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.split('=').map(c => c.trim());
    if (name && value) {
      acc[name] = decodeURIComponent(value);
    }
    return acc;
  }, {});
}

module.exports = { parseCookies };
