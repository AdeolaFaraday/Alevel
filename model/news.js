const mongoose = require("mongoose")

const newsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
      unique: true
    },
    description: {
      type: String,
      required: true,
      unique: true,
      maxlength: undefined
    },
    photo: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("News", newsSchema)
