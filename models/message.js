const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  messageText: { type: String, required: true, maxLength: 200 },
  date: { type: Date, default: Date.now },
  author: { type: Schema.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Message', MessageSchema);
