/**
 * Simple Markdown Parser (Naive)
 */

/**
 * Parse markdown to HTML
 * @param {string} markdown 
 * @returns {string} HTML
 */
function parseMarkdown(markdown) {
  let html = markdown
    // Headers
    .replace(/^# (.*$)/gim, '<h1></h1>')
    .replace(/^## (.*$)/gim, '<h2></h2>')
    .replace(/^### (.*$)/gim, '<h3></h3>')
    // Bold
    .replace(/\*\*(.*)\*\*/gim, '<b></b>')
    // Italic
    .replace(/\*(.*)\*/gim, '<i></i>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href=""></a>')
    // Code
    .replace(/`([^`]+)`/gim, '<code></code>');
    
  return html.trim();
}

module.exports = { parseMarkdown };
