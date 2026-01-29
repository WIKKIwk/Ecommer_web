/**
 * Feature Toggle utility
 */

const features = {};

/**
 * Enable a feature
 * @param {string} featureName 
 */
function enableFeature(featureName) {
    features[featureName] = true;
}

/**
 * Disable a feature
 * @param {string} featureName 
 */
function disableFeature(featureName) {
    features[featureName] = false;
}

/**
 * Check if feature is enabled
 * @param {string} featureName 
 * @returns {boolean}
 */
function isFeatureEnabled(featureName) {
    return !!features[featureName];
}

module.exports = { enableFeature, disableFeature, isFeatureEnabled };
