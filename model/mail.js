const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32
    },
    email: {
      type: String,
      required: true,
      maxlength: 32
    },
    phone: {
      type: Number,
      required: true
    },
    phonetwo: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      maxlength: undefined
    },
    date: {
      type: String,
      required: true,
      maxlength: undefined
    },
    state: {
      type: String,
      required: true,
      maxlength: undefined
    },
    course: {
      type: String,
      required: true,
      maxlength: undefined
    },
    institution: {
      type: String,
      required: true,
      maxlength: undefined
    },
    choice: {
      type: String,
      required: true,
      maxlength: undefined
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Message", messageSchema)
