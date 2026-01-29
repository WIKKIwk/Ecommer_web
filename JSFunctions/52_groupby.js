/**
 * GroupBy Utility
 */

/**
 * Group array by key
 * @param {Array} collection 
 * @param {string|Function} iteratee 
 * @returns {Object} Grouped object
 */
function groupBy(collection, iteratee) {
    return collection.reduce((result, item) => {
        const key = typeof iteratee === 'function' ? iteratee(item) : item[iteratee];
        (result[key] = result[key] || []).push(item);
        return result;
    }, {});
}

module.exports = { groupBy };
