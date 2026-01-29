/**
 * Observable Pattern
 */

class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(fn) {
        this.observers.push(fn);
        return () => this.unsubscribe(fn);
    }

    unsubscribe(fn) {
        this.observers = this.observers.filter(sub => sub !== fn);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }
}

module.exports = Observable;
