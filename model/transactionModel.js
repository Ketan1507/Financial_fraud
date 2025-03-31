const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true
    },
  resiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Account",
      required: true
    },
  amount: {
    type: Number,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  card_no: {
    type: Number,
    required: false
  },
  transaction_type: {
    type: Number,
    required: false
  },
  is_fraud: {
    type: Boolean,
    required: false,
    default: false
  },
  prediction_score: {
    type: Number,
    required: false,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
