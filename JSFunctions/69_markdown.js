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
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        // Bold
        .replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')
        // Italic
        .replace(/\*(.*)\*/gim, '<i>$1</i>')
        // Links
        .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
        // Code
        .replace(/\`([^\`]+)\`/gim, '<code>$1</code>');

    return html.trim();
}

module.exports = { parseMarkdown };
