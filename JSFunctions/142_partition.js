/**
 * Partition Utility
 */

/**
 * Creates an array of elements split into two groups, the first of which contains elements predicate returns truthy for, the second of which returns falsey for.
 * @param {Array} array 
 * @param {Function} predicate 
 * @returns {Array} [truthy, falsy]
 */
function partition(array, predicate) {
  return array.reduce(
    ([pass, fail], elem) => {
      return predicate(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]];
    },
    [[], []]
  );
}

module.exports = { partition };
