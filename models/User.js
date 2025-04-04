const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
}, { collection: 'users' });

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});


const User = mongoose.model('User', userSchema);
module.exports = User;
