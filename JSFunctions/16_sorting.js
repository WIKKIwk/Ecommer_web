/**
 * Sorting algorithms
 */

/**
 * Bubble sort
 * @param {Array} arr - Array to sort
 * @returns {Array} Sorted array
 */
function bubbleSort(arr) {
    const sorted = [...arr];
    const n = sorted.length;

    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (sorted[j] > sorted[j + 1]) {
                [sorted[j], sorted[j + 1]] = [sorted[j + 1], sorted[j]];
            }
        }
    }

    return sorted;
}

/**
 * Quick sort
 * @param {Array} arr - Array to sort
 * @returns {Array} Sorted array
 */
function quickSort(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);

    return [...quickSort(left), ...middle, ...quickSort(right)];
}

module.exports = { bubbleSort, quickSort };
