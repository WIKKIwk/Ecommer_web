/**
 * Async Series
 */

/**
 * Run async tasks in series
 * @param {Array<Function>} tasks 
 * @returns {Promise<Array>}
 */
async function series(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}

module.exports = { series };
