/**
 * Converts a normal English prompt/sentence to camelCase
 * @param {string} text - The input text to convert
 * @returns {string} - The camelCase version of the text
 */
export function toCamelCase(text: string): string {
  // Remove special characters and extra spaces, then split into words
  const words = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/gi, '') // Remove special characters
    .split(/\s+/) // Split by one or more spaces
    .filter(word => word.length > 0); // Remove empty strings

  // If no words, return empty string
  if (words.length === 0) return '';

  // First word stays lowercase, capitalize first letter of subsequent words
  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}
