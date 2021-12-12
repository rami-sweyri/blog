const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1255,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", schema);
module.exports = Comment;
