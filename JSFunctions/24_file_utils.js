/**
 * File utilities
 */

/**
 * Read file as text
 * @param {File} file - File object
 * @returns {Promise<string>} File content
 */
function readFileAsText(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

/**
 * Read file as Data URL (base64)
 * @param {File} file - File object
 * @returns {Promise<string>} Data URL
 */
function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

/**
 * Convert Blob to File
 * @param {Blob} blob - The blob
 * @param {string} fileName - Filename
 * @returns {File} File object
 */
function blobToFile(blob, fileName) {
    return new File([blob], fileName, { type: blob.type });
}

module.exports = { readFileAsText, readFileAsDataURL, blobToFile };
