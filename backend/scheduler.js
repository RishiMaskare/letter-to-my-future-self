import "dotenv/config";
import cron from "node-cron";
import Letter from "./models/dbSchema.js";
import { sendEmail } from "./utils/sendEmail.js";
import { decrypt } from "./utils/encryption.js";

console.log("✅ Scheduler running...");

cron.schedule("* * * * *", async () => {
  console.log("🔍 Checking letters...");

  try {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 330); // IST FIX

    const letters = await Letter.find({
      sendDate: { $lte: now },
      isSent: false,
    });

    for (const letter of letters) {
      try {
        // 🔓 Try decrypting (may fail for old data)
        const decryptedLetter = decrypt(letter.letter);

        await sendEmail(
          letter.email,
          "💌 A Letter from Your Past Self",
          decryptedLetter
        );

        letter.isSent = true;
        letter.sentAt = new Date();
        await letter.save();

        console.log("✅ Sent letter to:", letter.email);
      } catch (err) {
        console.error(
          `⚠️ Skipping letter ${letter._id}: ${err.message}`
        );
        continue;
      }
    }
  } catch (err) {
    console.error("❌ Scheduler fatal error:", err);
  }
});
