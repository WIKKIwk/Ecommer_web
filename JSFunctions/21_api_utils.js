/**
 * API Utility functions
 */

/**
 * Build URL with query parameters
 * @param {string} url - Base URL
 * @param {Object} params - Query parameters
 * @returns {string} URL with query string
 */
function buildUrl(url, params = {}) {
    const queryString = Object.keys(params)
        .map(key => \`\${encodeURIComponent(key)}=\${encodeURIComponent(params[key])}\`)
    .join('&');
  return queryString ? \`\${url}?\${queryString}\` : url;
}

/**
 * Parse JSON safely
 * @param {string} json - JSON string
 * @param {*} fallback - Fallback value
 * @returns {*} Parsed value or fallback
 */
function safeJSONParse(json, fallback = null) {
  try {
    return JSON.parse(json);
  } catch (e) {
    return fallback;
  }
}

module.exports = { buildUrl, safeJSONParse };
