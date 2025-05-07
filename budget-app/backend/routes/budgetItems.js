import express from "express";
import BudgetItem from "../models/BudgetItem.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const items = await BudgetItem.find().sort({ type: 1, order: 1 });
        res.json(items);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", async (req, res) => {
    const { type, category, amounts, order } = req.body;

    if (!type || !category || !amounts) {
        return res.status(400).json({ message: "Type, category, and amounts are required" });
    }

    try {
        let finalOrder = order;
        if (typeof finalOrder !== "number") {
            const count = await BudgetItem.countDocuments({ type });
            finalOrder = count;
        }

        const updatedOrInserted = await BudgetItem.findOneAndUpdate(
            { type, category },
            { $set: { amounts, order: finalOrder } },
            { upsert: true, new: true }
        );
        res.status(201).json(updatedOrInserted);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:id", async (req, res) => {
    const { id } = req.params;
    const { type, category, amounts, order } = req.body;

    if (!type || !category || !amounts) {
        return res.status(400).json({ message: "Type, category, and amounts are required" });
    }

    try {
        const updatedBudgetItem = await BudgetItem.findByIdAndUpdate(
            id,
            { $set: { type, category, amounts, ...(order !== undefined && { order }) } },
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

router.patch("/update-order/:type", async (req, res) => {
    const newOrder = req.body;
    if (!Array.isArray(newOrder) || newOrder.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
    }

    try {
        const bulkOps = newOrder.map((item, index) => ({
            updateOne: {
                filter: { _id: item.id },
                update: { $set: { order: index } },
            },
        }));
        await BudgetItem.bulkWrite(bulkOps);

        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to update order", error: error.message });
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
        const deleted = await BudgetItem.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({ message: "Item not found" });
        }
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

export default router;
