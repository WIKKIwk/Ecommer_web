/**
 * Stack Data Structure
 */

class Stack {
  constructor() {
    this.items = [];
  }

  /**
   * Push element to stack
   * @param {*} element 
   */
  push(element) {
    this.items.push(element);
  }

  /**
   * Pop element from stack
   * @returns {*} Popped element
   */
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }

  /**
   * Peek at top element
   * @returns {*} Top element
   */
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }

  /**
   * Check if empty
   * @returns {boolean} True if empty
   */
  isEmpty() {
    return this.items.length === 0;
  }

  /**
   * Clear stack
   */
  clear() {
    this.items = [];
  }

  /**
   * Get size
   * @returns {number} Size
   */
  size() {
    return this.items.length;
  }
}

module.exports = Stack;
