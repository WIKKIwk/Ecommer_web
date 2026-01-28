/**
 * Random Walk Generator
 */

/**
 * Generate 1D random walk
 * @param {number} steps 
 * @returns {Array}
 */
function randomWalk1D(steps) {
  const walk = [0];
  for (let i = 1; i < steps; i++) {
    const step = Math.random() < 0.5 ? -1 : 1;
    walk.push(walk[i-1] + step);
  }
  return walk;
}

/**
 * Generate 2D random walk
 * @param {number} steps 
 * @returns {Array} Array of {x,y}
 */
function randomWalk2D(steps) {
  const walk = [{x: 0, y: 0}];
  for (let i = 1; i < steps; i++) {
    const r = Math.random();
    let dx = 0, dy = 0;
    if (r < 0.25) dx = 1;
    else if (r < 0.5) dx = -1;
    else if (r < 0.75) dy = 1;
    else dy = -1;
    
    const prev = walk[i-1];
    walk.push({
      x: prev.x + dx,
      y: prev.y + dy
    });
  }
  return walk;
}

module.exports = { randomWalk1D, randomWalk2D };
