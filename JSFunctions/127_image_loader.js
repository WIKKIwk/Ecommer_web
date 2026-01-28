/**
 * Image Loader
 */

/**
 * Load image promise
 * @param {string} url 
 * @returns {Promise<HTMLImageElement>}
 */
function loadImage(url) {
  return new Promise((resolve, reject) => {
    // In node environment, this mock would fail, but it's for browser usage
    if (typeof Image === 'undefined') {
      reject(new Error('Image not defined (not in browser)'));
      return;
    }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
}

module.exports = { loadImage };
