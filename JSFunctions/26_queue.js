/**
 * Queue Data Structure
 */

class Queue {
    constructor() {
        this.items = [];
    }

    /**
     * Enqueue element
     * @param {*} element 
     */
    enqueue(element) {
        this.items.push(element);
    }

    /**
     * Dequeue element
     * @returns {*} Dequeued element
     */
    dequeue() {
        if (this.isEmpty()) return null;
        return this.items.shift();
    }

    /**
     * Peek at front element
     * @returns {*} Front element
     */
    front() {
        if (this.isEmpty()) return null;
        return this.items[0];
    }

    /**
     * Check if empty
     * @returns {boolean} True if empty
     */
    isEmpty() {
        return this.items.length === 0;
    }

    /**
     * Get size
     * @returns {number} Size
     */
    size() {
        return this.items.length;
    }

    /**
     * Clear queue
     */
    clear() {
        this.items = [];
    }
}

module.exports = Queue;
