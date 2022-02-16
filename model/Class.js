const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fees: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required:true,
  },
  instructor: {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
  },
  notes: { type: String, default: "notes.png" },
  rating: { type: Number, default: 10 },
  students: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports=mongoose.model('Class',classSchema);