const mongoose = require("mongoose");

const AccountModel = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  type: {
    type: String,
    required: true,
    default: "saving"
  },
  maxLimit: {
    type: Number,
    required: true,
    default: 0
  },
  balance: {
    type: Number,
    required: true,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Account", AccountModel);
