import { randomBytes } from "crypto";

// The generatePassword function takes a length parameter and generates a password of the specified length.
export function generatePassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charsetLength = charset.length;
  let password = "";

  // Generate cryptographically secure random bytes
  const randomBytesArray = randomBytes(length);

  for (let i = 0; i < length; i++) {
    // Use the random byte as an index to select a character from the charset
    const randomIndex = randomBytesArray[i] % charsetLength;
    password += charset.charAt(randomIndex);
  }

  return password;
}
