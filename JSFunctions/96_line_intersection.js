/**
 * Line Intersection Utility
 */

/**
 * Check if lines intersect (and get point)
 * @param {Object} p1 Line 1 start {x,y}
 * @param {Object} p2 Line 1 end {x,y}
 * @param {Object} p3 Line 2 start {x,y}
 * @param {Object} p4 Line 2 end {x,y}
 * @returns {Object|null} Intersection point or null
 */
function getLineIntersection(p1, p2, p3, p4) {
  const x1 = p1.x, y1 = p1.y, x2 = p2.x, y2 = p2.y;
  const x3 = p3.x, y3 = p3.y, x4 = p4.x, y4 = p4.y;

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denom == 0) return null; // Parallel

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;

  if (ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1) {
    return {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1)
    };
  }
  return null;
}

module.exports = { getLineIntersection };
