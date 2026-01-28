/**
 * Simple 1D Noise (Linear Interpolated)
 */

class SimpleNoise1D {
  constructor(size = 256) {
    this.size = size;
    this.buffer = new Float32Array(size);
    for (let i = 0; i < size; i++) {
      this.buffer[i] = Math.random();
    }
  }

  get(x) {
    const scaledX = x * 0.1; // Scale factor
    const index = Math.floor(scaledX) % this.size;
    const nextIndex = (index + 1) % this.size;
    const t = scaledX - Math.floor(scaledX);
    
    // Linear interpolation
    const v1 = this.buffer[index];
    const v2 = this.buffer[nextIndex];
    
    return v1 * (1 - t) + v2 * t;
  }
}

module.exports = SimpleNoise1D;
