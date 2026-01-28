/**
 * Async Waterfall
 */

/**
 * Run async tasks in series, passing result to next
 * @param {Array<Function>} tasks 
 * @param {*} initialValue 
 * @returns {Promise<*>}
 */
async function waterfall(tasks, initialValue) {
  let result = initialValue;
  for (const task of tasks) {
    result = await task(result);
  }
  return result;
}

module.exports = { waterfall };
