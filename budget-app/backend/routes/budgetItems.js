import express from "express";
import BudgetItem from "../models/BudgetItem.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const items = await BudgetItem.find();
        res.json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    const { type, category, amounts } = req.body;

    if (!type || !category || !amounts) {
        return res.status(400).json({ message: "Type, category, and amounts are required" });
    }

    try {
        const updatedOrInserted = await BudgetItem.findOneAndUpdate(
            { type, category },
            { $set: { amounts } },
            { upsert: true, new: true }
        );
        res.status(201).json(updatedOrInserted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { type, category, amounts } = req.body;
    if (!type || !category || !amounts) {
        return res.status(400).json({ message: "Type, category, and amounts are required" });
    }

    try {
        const updatedBudgetItem = await BudgetItem.findByIdAndUpdate(
            id,
            { $set: { type, category, amounts } },
            { new: true }
        );

        if (!updatedBudgetItem) {
            return res.status(404).json({ message: "Budget item not found" });
        }

        res.status(200).json(updatedBudgetItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/delete-all", async (req, res) => {
    try {
        const result = await BudgetItem.deleteMany({});
        res.status(200).json({ message: `${result.deletedCount} documents deleted.` });
    } catch (err) {
        res.status(500).json({ message: "Error deleting documents.", error: err });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await BudgetItem.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
