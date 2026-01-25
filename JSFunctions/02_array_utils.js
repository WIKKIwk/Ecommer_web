/**
 * Array utility functions
 */

/**
 * Flatten nested array
 * @param {Array} arr - Array to flatten
 * @returns {Array} Flattened array
 */
function flattenArray(arr) {
    return arr.reduce((flat, item) => {
        return flat.concat(Array.isArray(item) ? flattenArray(item) : item);
    }, []);
}

/**
 * Chunk array into smaller arrays
 * @param {Array} arr - Array to chunk
 * @param {number} size - Chunk size
 * @returns {Array} Chunked array
 */
function chunkArray(arr, size) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += size) {
        chunks.push(arr.slice(i, i + size));
    }
    return chunks;
}

/**
 * Remove duplicates from array
 * @param {Array} arr - Array with duplicates
 * @returns {Array} Array without duplicates
 */
function removeDuplicates(arr) {
    return [...new Set(arr)];
}

module.exports = { flattenArray, chunkArray, removeDuplicates };
