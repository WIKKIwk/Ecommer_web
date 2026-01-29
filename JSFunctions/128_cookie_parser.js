/**
 * Cookie Parser
 */

/**
 * Parse cookie string to object
 * @param {string} cookieStr (defaults to document.cookie)
 * @returns {Object} Key-value pairs
 */
function parseCookies(cookieStr) {
    const str = cookieStr || (typeof document !== 'undefined' ? document.cookie : '');
    if (!str) return {};

    return str.split(';')
        .map(v => v.split('='))
        .reduce((acc, v) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {});
}

module.exports = { parseCookies };
