const Transaction = require('../model/transactionModel');
const FraudReport = require('../model/fraudReportsModel');

const createTransaction = async (req, res) => {
    try {
        const { sender, resiver, amount, method, card_no, transaction_type } = req.body;
        const transaction = new Transaction({ sender, resiver, amount, method, card_no, transaction_type });
        await transaction.save();
        res.status(201).json({ status: ture , message: "Transaction created successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error });
    }
}

const getTransactions = async (req, res) => {
    try {
        let transactions = null;
        const { id } = req.params;
        if(id) {
            transactions = await Transaction.findById(id);
        } else {
            transactions = await Transaction.find();
        }
        res.status(200).json({ status:true, message: "Data Fetch Successfull!", data: transactions });
    } catch (error) {
        res.status(500).json({ status:false, message: "Server error", error });
    }
}

const feedbackTransaction = async (req, res) => {
    try {
        const { transaction_id, user_id, feedback } = req.body;
        const transaction = await Transaction.findById(transaction_id);
        if(!transaction)
            return res.status(404).json({ status: false, message: "Transaction not found" });
        
        const fraudReport = new FraudReport({ transaction_id, user_id, feedback });
        await fraudReport.save();
        res.status(200).json({ status: true, message: "Feedback submited successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    feedbackTransaction
}