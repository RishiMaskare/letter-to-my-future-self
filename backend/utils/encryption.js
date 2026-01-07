import crypto from "crypto";

const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16;

// 🔒 Load key safely AFTER env is available
if (!process.env.LETTER_ENCRYPTION_KEY) {
  throw new Error(
    "❌ LETTER_ENCRYPTION_KEY is missing in environment variables"
  );
}

// Always derive a 32-byte key
const KEY = crypto
  .createHash("sha256")
  .update(process.env.LETTER_ENCRYPTION_KEY)
  .digest();

export const encrypt = (text) => {
  if (!text) return text;

  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  const authTag = cipher.getAuthTag().toString("hex");

  return `${iv.toString("hex")}:${authTag}:${encrypted}`;
};

export const decrypt = (encryptedText) => {
  if (!encryptedText) return encryptedText;

  const parts = encryptedText.split(":");
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted data format");
  }

  const [ivHex, authTagHex, encrypted] = parts;

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
};
