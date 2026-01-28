/**
 * Simple Nano ID
 */

/**
 * Generate nano ID
 * @param {number} size 
 * @returns {string}
 */
function nanoId(size = 21) {
  const urlAlphabet = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict';
  let id = '';
  let i = size;
  while (i--) {
    id += urlAlphabet[(Math.random() * 64) | 0];
  }
  return id;
}

module.exports = { nanoId };
