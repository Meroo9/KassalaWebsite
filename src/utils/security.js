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
  
  let cleaned = query.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "").replace(/<[^>]*>/g, "");
  
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
 * Normalizes Arabic text for robust, typo-tolerant keyword search:
 * - Unifies Alefs: أ, إ, آ, ٱ -> ا
 * - Unifies Taa Marbouta and Haa: ة -> ه
 * - Unifies Alef Maqsoura and Yaa: ى -> ي
 * - Unifies Hamza variants: ؤ -> و, ئ -> ي
 * - Strips all Arabic Harakat / Tashkeel and Tatweel
 */
export function normalizeArabic(text) {
  if (!text || typeof text !== "string") return "";
  return text
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u065F\u0670]/g, "") // Remove Tashkeel
    .replace(/ـ/g, "") // Remove Tatweel
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[^\w\s\u0600-\u06FF]/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Intelligent multi-token search matcher for Arabic and English:
 * Supports partial matching, 'ال' prefix tolerance, and out-of-order keywords.
 */
export function matchesSearch(targetText, searchQuery) {
  if (!targetText || !searchQuery) return false;
  
  const normTarget = normalizeArabic(String(targetText));
  const normQuery = normalizeArabic(String(searchQuery));
  if (!normQuery) return false;

  // 1. Direct phrase inclusion
  if (normTarget.includes(normQuery)) return true;

  // 2. Tokenized multi-word search
  const queryTokens = normQuery.split(" ").filter(t => t.length > 0);
  if (queryTokens.length === 0) return false;

  return queryTokens.every(token => {
    if (normTarget.includes(token)) return true;
    // Strip Arabic 'ال' prefix if token is longer than 3 chars
    if (token.startsWith("ال") && token.length > 3) {
      const stripped = token.slice(2);
      if (normTarget.includes(stripped)) return true;
    }
    // Try adding 'ال' prefix if token doesn't have it
    if (!token.startsWith("ال") && token.length >= 3) {
      if (normTarget.includes("ال" + token)) return true;
    }
    return false;
  });
}

/**
 * Sanitizes image URLs and base64 data URIs without breaking slashes.
 * @param {string} url Image source
 * @returns {string}
 */
export function sanitizeImageUrl(url) {
  if (!url || typeof url !== "string") return "";
  let cleaned = url.replace(/<script[^>]*>([\s\S]*?)<\/script>/gi, "").replace(/<[^>]*>/g, "");
  return cleaned.trim();
}
