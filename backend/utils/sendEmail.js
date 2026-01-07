import "dotenv/config";
import sgMail from "@sendgrid/mail";


if (!process.env.SENDGRID_API_KEY) {
  console.error("❌ SENDGRID_API_KEY missing");
} else {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  console.log(
    "SG KEY LOADED:",
    process.env.SENDGRID_API_KEY.startsWith("SG.")
  );
}

export const sendEmail = async (to, subject, text) => {
  try {
    const msg = {
      to,
      from: process.env.SENDER_EMAIL, // ✅ CORRECT
      subject,
      text,
    };

    await sgMail.send(msg);
    console.log("✅ Email sent to:", to);
  } catch (error) {
    console.error(
      "❌ SendGrid Error:",
      error.response?.body || error.message
    );
  }
};
