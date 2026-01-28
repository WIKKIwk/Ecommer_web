/**
 * FPS Counter
 */

class FPS {
  constructor() {
    this.fps = 0;
    this.frames = 0;
    this.startTime = Date.now();
  }

  tick() {
    this.frames++;
    const now = Date.now();
    if (now - this.startTime >= 1000) {
      this.fps = this.frames;
      this.frames = 0;
      this.startTime = now;
      return this.fps;
    }
    return null;
  }
}

module.exports = FPS;
