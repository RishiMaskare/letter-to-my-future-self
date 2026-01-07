import express from "express";
import Letter from "../models/dbSchema.js";
import { encrypt } from "../utils/encryption.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, email, letter, sendDate } = req.body;

    if (!name || !email || !letter || !sendDate) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address",
      });
    }

    const sendDateObj = new Date(sendDate);
    sendDateObj.setHours(5, 30, 0, 0); // IST midnight

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (sendDateObj < today) {
      return res.status(400).json({
        success: false,
        message: "Send date cannot be in the past",
      });
    }

    // 🔐 ENCRYPT LETTER BEFORE SAVING
    const encryptedLetter = encrypt(letter);

    const newLetter = await Letter.create({
      name,
      email,
      letter: encryptedLetter, // 🔐 encrypted text
      sendDate: sendDateObj,
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Letter saved securely",
      data: newLetter,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

export default router;
