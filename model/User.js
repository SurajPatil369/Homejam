const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["instructor", "student"],
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  classes: [{ type: mongoose.Schema.ObjectId, ref: "Class" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
