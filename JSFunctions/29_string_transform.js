/**
 * String transformations
 */

/**
 * Convert to camelCase
 * @param {string} str 
 * @returns {string}
 */
function toCamelCase(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
    return index === 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}

/**
 * Convert to PascalCase
 * @param {string} str 
 * @returns {string}
 */
function toPascalCase(str) {
  return str.replace(/(\w)(\w*)/g,
    (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
  ).replace(/\s+/g, '');
}

/**
 * Convert to snake_case
 * @param {string} str 
 * @returns {string}
 */
function toSnakeCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
}

/**
 * Convert to kebab-case
 * @param {string} str 
 * @returns {string}
 */
function toKebabCase(str) {
  return str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
}

module.exports = { toCamelCase, toPascalCase, toSnakeCase, toKebabCase };
