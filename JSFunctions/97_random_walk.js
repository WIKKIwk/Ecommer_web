/**
 * Random Walk Generator
 */

/**
 * Generate 2D random walk
 * @param {number} steps 
 * @returns {Array} Array of points {x,y}
 */
function randomWalk(steps) {
    const points = [{ x: 0, y: 0 }];
    for (let i = 0; i < steps; i++) {
        const last = points[points.length - 1];
        const angle = Math.random() * 2 * Math.PI;
        const r = Math.random(); // Step size
        points.push({
            x: last.x + r * Math.cos(angle),
            y: last.y + r * Math.sin(angle)
        });
    }
    return points;
}

module.exports = { randomWalk };
