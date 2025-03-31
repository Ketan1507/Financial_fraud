const express = require("express");
const {
    createTransaction,
    getTransactions,
    feedbackTransaction
} = require("../controller/transactionController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, createTransaction);
router.post("/?:id", authMiddleware, getTransactions);
router.post("/feedback", authMiddleware, feedbackTransaction);

module.exports = router;