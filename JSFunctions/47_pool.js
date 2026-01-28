/**
 * Async Pool Utility
 */

/**
 * Execute async functions with concurrency limit
 * @param {number} concurrency 
 * @param {Array<Function>} tasks 
 * @returns {Promise<Array>}
 */
async function asyncPool(concurrency, tasks) {
  const results = [];
  const executing = [];
  
  for (const task of tasks) {
    const p = Promise.resolve().then(() => task());
    results.push(p);

    if (concurrency < tasks.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1));
      executing.push(e);
      if (executing.length >= concurrency) {
        await Promise.race(executing);
      }
    }
  }
  
  return Promise.all(results);
}

module.exports = { asyncPool };
