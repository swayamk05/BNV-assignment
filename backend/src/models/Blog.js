const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100
    },
    author: {
      type: String,
      required: true,
      trim: true,
      minlength: 3
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    tags: {
      type: [String],
      default: []
    },
    status: {
      type: String,
      required: true,
      enum: ["Draft", "Published"]
    },
    thumbnailUrl: {
      type: String,
      trim: true
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 300
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 50
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
