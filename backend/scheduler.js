import "dotenv/config";
import cron from "node-cron";
import Letter from "./models/dbSchema.js";
import { sendEmail } from "./utils/sendEmail.js";
import { decrypt } from "./utils/encryption.js";

console.log("Scheduler running...");

cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 330); // IST FIX

    console.log("Checking letters...");

    const letters = await Letter.find({
      sendDate: { $lte: now },
      isSent: false,
    });

    for (let letter of letters) {
      // 🔓 DECRYPT LETTER BEFORE SENDING
      const decryptedLetter = decrypt(letter.letter);

      await sendEmail(
        letter.email,
        "💌 A Letter from Your Past Self",
        decryptedLetter
      );

      letter.isSent = true;
      letter.sentAt = new Date();
      await letter.save();

      console.log("Sent letter to:", letter.email);
    }
  } catch (err) {
    console.error("Scheduler error:", err);
  }
});
