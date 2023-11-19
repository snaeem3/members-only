const mongoose = require('mongoose');

const { Schema } = mongoose;

const MessageSchema = new Schema({
  messageText: { type: String, required: true, maxLength: 200 },
  date: { type: Date, default: Date.now },
  author: { type: Schema.ObjectId, ref: 'User', required: true },
});

MessageSchema.virtual('url').get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/message/${this._id}`;
});

module.exports = mongoose.model('Message', MessageSchema);
