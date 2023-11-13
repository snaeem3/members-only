const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  displayName: { type: String, required: true, maxLength: 100 },
  username: { type: String, required: true, maxLength: 100 },
  password: { type: String, required: true, minLength: 6 },
  memberStatus: {
    type: String,
    enum: ['member', 'admin', 'none'],
    default: 'none',
  },
});

module.exports = mongoose.model('User', UserSchema);
