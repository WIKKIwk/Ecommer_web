/**
 * Clipboard utilities
 */

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Promise resolving when copied
 */
async function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    return Promise.resolve();
  }
}

/**
 * Read text from clipboard
 * @returns {Promise<string>} Clipboard text
 */
async function readFromClipboard() {
  if (navigator.clipboard && navigator.clipboard.readText) {
    return navigator.clipboard.readText();
  }
  return Promise.reject('Clipboard API not supported');
}

module.exports = { copyToClipboard, readFromClipboard };
