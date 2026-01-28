/**
 * Prime Number Generator
 */

/**
 * Generate primes up to limit
 * @param {number} limit 
 */
function* primeGenerator(limit) {
  if (limit < 2) return;
  
  const sieve = new Uint8Array(limit + 1).fill(1);
  sieve[0] = 0;
  sieve[1] = 0;
  
  for (let i = 2; i <= Math.sqrt(limit); i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= limit; j += i) {
        sieve[j] = 0;
      }
    }
  }
  
  for (let i = 2; i <= limit; i++) {
    if (sieve[i]) yield i;
  }
}

module.exports = { primeGenerator };
