/**
 * Simple Logger utility
 */

const levels = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
};

class Logger {
    constructor(level = 'INFO') {
        this.level = levels[level] || levels.INFO;
    }

    log(level, message, ...args) {
        if (levels[level] >= this.level) {
            const timestamp = new Date().toISOString();
            console.log(\`[\${timestamp}] [\${level}] \${message}\`, ...args);
    }
  }

  debug(msg, ...args) { this.log('DEBUG', msg, ...args); }
  info(msg, ...args) { this.log('INFO', msg, ...args); }
  warn(msg, ...args) { this.log('WARN', msg, ...args); }
  error(msg, ...args) { this.log('ERROR', msg, ...args); }
}

module.exports = Logger;
