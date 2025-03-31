const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  ph_no: {
    type: String,
    required: true,
    maxLenght: 15,
    minLenght: 6
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    default: 0 //0 for customer 1 for admin
  },
  dob: {
    type: Date,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
  } catch (error) {
      next(error);
  }
});

UserSchema.method.comparePassword = async function (password) {
  try {
      const isMatch = await bcrypt.compare(password, this.password);
      return isMatch;
  } catch (err) {
      throw err;
  }
};

module.exports = mongoose.model("User", UserSchema);
