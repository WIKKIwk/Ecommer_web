/**
 * Linked List Data Structure
 */

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  /**
   * Add element to end
   * @param {*} data 
   */
  add(data) {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = node;
    }
    this.size++;
  }

  /**
   * Insert at index
   * @param {*} data 
   * @param {number} index 
   */
  insertAt(data, index) {
    if (index < 0 || index > this.size) return false;

    const node = new Node(data);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let current = this.head;
      let prev;
      let it = 0;
      while (it < index) {
        it++;
        prev = current;
        current = current.next;
      }
      node.next = current;
      prev.next = node;
    }
    this.size++;
  }

  /**
   * Remove from index
   * @param {number} index 
   * @returns {*} Removed data
   */
  removeFrom(index) {
    if (index < 0 || index >= this.size) return null;

    let current = this.head;
    let prev = current;
    let it = 0;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (it < index) {
        it++;
        prev = current;
        current = current.next;
      }
      prev.next = current.next;
    }
    this.size--;
    return current.data;
  }

  /**
   * Check if empty
   * @returns {boolean}
   */
  isEmpty() {
    return this.size === 0;
  }
}

module.exports = LinkedList;
