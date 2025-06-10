import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const budgets = await Budget.find().sort({ createdAt: -1 });
        res.json(budgets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const budget = await Budget.findById(req.params.id);
        if (!budget) {
            return res.status(404).json({ message: "Budget not found" });
        }
        res.json(budget);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    const { title, items } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const newBudget = new Budget({
            title,
            items: items || [],
        });
        const saved = await newBudget.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const updated = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updated) return res.status(404).json({ message: "Budget not found" });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const deleted = await Budget.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Budget not found" });
        res.json({ message: "Budget deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
