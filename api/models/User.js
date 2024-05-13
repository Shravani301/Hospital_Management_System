const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }], // Array of patient IDs associated with the user
});

const User = mongoose.model('User', userSchema);

module.exports = User;
