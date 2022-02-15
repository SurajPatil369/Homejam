const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema({
  name: {
    type: String,
    required: [true, "please enter class name"],
  },
  duration: {
    type: Number,
    required: [true, "please enter the class duration"],
  },
  instructor: {
    name: { type: String, required: true },
    email: {
      type: String,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      ],
      required: true,
    },
  },
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
