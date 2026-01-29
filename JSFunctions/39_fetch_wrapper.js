/**
 * Fetch Wrapper
 */

/**
 * Enhanced fetch with timeout and error handling
 * @param {string} url 
 * @param {Object} options 
 * @param {number} timeout 
 * @returns {Promise<any>}
 */
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        clearTimeout(id);

        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
    }

    // Attempt to parse JSON, fall back to text
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return await response.text();
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

module.exports = { fetchWithTimeout };
