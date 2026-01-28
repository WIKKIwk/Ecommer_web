/**
 * Minimal Hash Router
 */

class Router {
  constructor() {
    this.routes = {};
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  add(path, handler) {
    this.routes[path] = handler;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const handler = this.routes[hash];
    if (handler) handler();
  }

  navigate(path) {
    window.location.hash = path;
  }
}

module.exports = Router;
