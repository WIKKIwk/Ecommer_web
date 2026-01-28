/**
 * Random String Generator
 */

/**
 * Generate random string
 * @param {number} length 
 * @param {string} chars 
 * @returns {string}
 */
function randomString(length = 10, chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789') {
  let result = '';
  const charactersLength = chars.length;
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = { randomString };
