/**
 * Event emitter
 */

class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to event
     * @param {string} event - Event name
     * @param {Function} listener - Event listener
     */
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    /**
     * Unsubscribe from event
     * @param {string} event - Event name
     * @param {Function} listener - Event listener
     */
    off(event, listener) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    /**
     * Emit event
     * @param {string} event - Event name
     * @param {...*} args - Arguments to pass
     */
    emit(event, ...args) {
        if (!this.events[event]) return;
        this.events[event].forEach(listener => listener(...args));
    }

    /**
     * Subscribe to event once
     * @param {string} event - Event name
     * @param {Function} listener - Event listener
     */
    once(event, listener) {
        const onceWrapper = (...args) => {
            listener(...args);
            this.off(event, onceWrapper);
        };
        this.on(event, onceWrapper);
    }
}

module.exports = EventEmitter;
