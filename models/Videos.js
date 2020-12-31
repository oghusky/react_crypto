const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  published: {
    type: String,
    trim: true,
    required: false
  },
  title: {
    type: String,
    trim: true,
    required: false
  },
  description: {
    type: String,
    trim: true,
    required: false
  },
  link: {
    type: String,
    trim: true,
    required: false
  },
  img: {
    type: String,
    trim: true,
    required: false
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: {
      expires: 86400
    }
  }
});

module.exports = mongoose.model("Videos", videoSchema);