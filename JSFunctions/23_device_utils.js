/**
 * Device detection utilities
 */

/**
 * Check if mobile device
 * @returns {boolean} True if mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Check if touch device
 * @returns {boolean} True if touch supported
 */
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get OS name
 * @returns {string} OS name
 */
function getOS() {
    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
    const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
    const iosPlatforms = ['iPhone', 'iPad', 'iPod'];

    if (macosPlatforms.indexOf(platform) !== -1) return 'Mac OS';
    if (iosPlatforms.indexOf(platform) !== -1) return 'iOS';
    if (windowsPlatforms.indexOf(platform) !== -1) return 'Windows';
    if (/Android/.test(userAgent)) return 'Android';
    if (/Linux/.test(platform)) return 'Linux';

    return 'Unknown';
}

module.exports = { isMobile, isTouchDevice, getOS };
