import express from "express";
import Transaction from "../models/Transaction.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const transactions = await Transaction.find();
    res.json(transactions);
});

router.post("/", async (req, res) => {
    const newTransaction = new Transaction(req.body);
    try {
        const savedTransaction = await newTransaction.save();
        res.status(201).json(savedTransaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Transaction.findByIdAndDelete(req.params.id);
        res.json({ message: "Transaction deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
