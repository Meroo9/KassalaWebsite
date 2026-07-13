/**
 * Security & Input Sanitization Utilities
 * Helps defend the application against XSS, SQL Injection fragments, and HTML Injection.
 */

/**
 * Strips HTML tags and escapes special characters to prevent HTML/XSS Injection.
 * @param {string} val Input string
 * @returns {string} Sanitized string
 */
export function sanitizeInput(val) {
  if (typeof val !== "string") return "";
  
  // Remove script tags and their content
  let cleaned = val.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
  
  // Remove all HTML tags
  cleaned = cleaned.replace(/<[^>]*>/g, "");
  
  // Escape HTML entities to prevent rendering parsed tags
  return cleaned
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;")
    .trim();
}

/**
 * Validates whether the email matches standard security structures.
 * @param {string} email input email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  if (!email || typeof email !== "string") return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim()) && email.length < 120;
}

/**
 * Cleans search query inputs to mitigate potential SQL/Script injection fragments.
 * @param {string} query Search input
 * @returns {string}
 */
export function cleanSearchQuery(query) {
  if (!query || typeof query !== "string") return "";
  
  // Sanitize first
  let cleaned = sanitizeInput(query);
  
  // Strip common SQL Injection signatures
  const sqlPatterns = [
    /UNION\s+SELECT/gi,
    /OR\s+1\s*=\s*1/gi,
    /DROP\s+TABLE/gi,
    /INSERT\s+INTO/gi,
    /SELECT\s+.*\s+FROM/gi,
  ];
  
  sqlPatterns.forEach((pattern) => {
    cleaned = cleaned.replace(pattern, "");
  });
  
  return cleaned.trim();
}

/**
 * Sanitizes image URLs and base64 data URIs without breaking slashes.
 * @param {string} url Image source
 * @returns {string}
 */
export function sanitizeImageUrl(url) {
  if (typeof url !== "string") return "";
  
  // Remove script tags and HTML tags
  let cleaned = url.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "");
  cleaned = cleaned.replace(/<[^>]*>/g, "");
  
  // Return the cleaned string without escaping slashes for valid URLs/data URIs
  return cleaned.trim();
}
