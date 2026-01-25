/**
 * URL and query string utilities
 */

/**
 * Parse URL query string
 * @param {string} url - URL to parse
 * @returns {Object} Query parameters object
 */
function parseQuery(url = window.location.href) {
    const params = {};
    const queryString = url.split('?')[1];
    if (queryString) {
        queryString.split('&').forEach(param => {
            const [key, value] = param.split('=');
            params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    }
    return params;
}

/**
 * Build query string from object
 * @param {Object} params - Parameters object
 * @returns {string} Query string
 */
function buildQuery(params) {
    return Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
}

/**
 * Update URL query parameter
 * @param {string} key - Parameter key
 * @param {string} value - Parameter value
 */
function updateQueryParam(key, value) {
    const params = parseQuery();
    params[key] = value;
    const newQuery = buildQuery(params);
    window.history.pushState({}, '', `?${newQuery}`);
}

module.exports = { parseQuery, buildQuery, updateQueryParam };
