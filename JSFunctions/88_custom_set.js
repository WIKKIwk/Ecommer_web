/**
 * Custom Set implementation
 */

class CustomSet {
    constructor() {
        this.items = {};
    }

    add(value) {
        if (!this.has(value)) {
            this.items[value] = value;
            return true;
        }
        return false;
    }

    has(value) {
        return Object.prototype.hasOwnProperty.call(this.items, value);
    }

    remove(value) {
        if (this.has(value)) {
            delete this.items[value];
            return true;
        }
        return false;
    }

    size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.values(this.items);
    }
}

module.exports = CustomSet;
