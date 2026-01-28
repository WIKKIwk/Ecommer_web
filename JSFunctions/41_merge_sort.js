/**
 * Merge Sort Algorithm
 */

/**
 * Merge sort
 * @param {Array} arr - Array to sort
 * @returns {Array} Sorted array
 */
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

/**
 * Merge helper
 * @param {Array} left 
 * @param {Array} right 
 * @returns {Array}
 */
function merge(left, right) {
  let resultArray = [], leftIndex = 0, rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      resultArray.push(left[leftIndex]);
      leftIndex++; // move left array cursor
    } else {
      resultArray.push(right[rightIndex]);
      rightIndex++; // move right array cursor
    }
  }

  return resultArray
          .concat(left.slice(leftIndex))
          .concat(right.slice(rightIndex));
}

module.exports = { mergeSort };
