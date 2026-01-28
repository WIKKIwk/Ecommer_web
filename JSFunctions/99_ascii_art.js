/**
 * Simple ASCII Art Helper
 */

/**
 * Text banner generator (Simple block letters)
 * @param {string} text 
 * @returns {string} 
 */
function toBanner(text) {
  // Very simplified mapping for demo
  const map = {
    'A': [' A ', 'A A', 'AAA', 'A A'],
    'B': ['BB ', 'B B', 'BB ', 'B B', 'BB '],
    'C': [' CC', 'C  ', 'C  ', ' CC'],
    // ... complete alphabet would be huge
    ' ': ['   ', '   ', '   ', '   ']
  };
  
  // This is a placeholder for a real ASCII art generator logic
  return `
   ${text}
   -------
   (ASCII Art Placeholder)
  `;
}

module.exports = { toBanner };
