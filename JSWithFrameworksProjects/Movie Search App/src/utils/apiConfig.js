// API Configuration Helper
// This file helps manage API keys securely

/**
 * Get the OMDB API key from environment variables
 * Supports both Vite and Create React App naming conventions
 * @returns {string|null} API key or null if not found
 */
export const getApiKey = () => {
  // Vite naming convention (recommended for Vite projects)
  const viteApiKey = import.meta.env?.VITE_OMDB_API_KEY;
  
  // For legacy compatibility, we'll check if the key exists and is not a placeholder
  if (viteApiKey && viteApiKey !== 'your_api_key_here' && viteApiKey.length > 0) {
    return viteApiKey;
  }
  
  return null;
};

/**
 * Check if API key is properly configured
 * @returns {boolean} true if API key exists
 */
export const isApiKeyConfigured = () => {
  const apiKey = getApiKey();
  return apiKey && apiKey.length > 0;
};

/**
 * Build OMDB API URL with proper error handling
 * @param {string} searchTerm - Movie title to search for
 * @returns {string|null} Complete API URL or null if no API key
 */
export const buildApiUrl = (searchTerm) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    console.error('❌ OMDB API key not found!');
    console.error('📝 Please check your .env.local file and ensure you have:');
    console.error('   VITE_OMDB_API_KEY=your_api_key_here');
    return null;
  }
  
  if (!searchTerm || searchTerm.trim().length === 0) {
    console.warn('⚠️ Search term is empty');
    return null;
  }
  
  return `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(searchTerm.trim())}`;
};

// Default export for convenience
export default {
  getApiKey,
  isApiKeyConfigured,
  buildApiUrl
};