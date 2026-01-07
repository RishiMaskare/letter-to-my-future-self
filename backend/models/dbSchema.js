import mongoose from "mongoose";

const letterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    letter: {
      type: String,
      required: true
    },
    isSent: {
      type: Boolean,
      default: false
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    sendDate: {
      type: Date,
      required: true
    },
    sentAt: {
      type: Date
    }
  },
  { timestamps: true } // creates createdAt & updatedAt automatically
);

const Letter = mongoose.model("Letter", letterSchema);

export default Letter;
