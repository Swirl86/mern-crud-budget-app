import express from "express";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/:budgetId/items", async (req, res) => {
    const { budgetId } = req.params;

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ message: "Budget not found" });

        const sortedItems = budget.items.sort((a, b) => {
            if (a.type === b.type) return a.order - b.order;
            return a.type.localeCompare(b.type);
        });

        res.json(sortedItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/:budgetId/items", async (req, res) => {
    const { budgetId } = req.params;
    const { type, category, amounts, order } = req.body;

    if (!type || !category || !amounts) {
        return res.status(400).json({ message: "Type, category, and amounts are required" });
    }

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ message: "Budget not found" });

        const itemsOfType = budget.items.filter((item) => item.type === type);
        const finalOrder = typeof order === "number" ? order : itemsOfType.length;

        const newItem = {
            type,
            category,
            amounts,
            order: finalOrder,
        };

        budget.items.push(newItem);
        await budget.save();

        res.status(201).json(budget.items[budget.items.length - 1]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:budgetId/items/:itemId", async (req, res) => {
    const { budgetId, itemId } = req.params;
    const { type, category, amounts, order } = req.body;

    if (!type || !category || !amounts) {
        return res.status(400).json({ message: "Type, category, and amounts are required" });
    }

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ message: "Budget not found" });

        const item = budget.items.find((i) => i._id.toString() === itemId);
        if (!item) return res.status(404).json({ message: "Item not found" });

        item.type = type;
        item.category = category;
        item.amounts = amounts;
        if (order !== undefined) item.order = order;

        await budget.save();
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.patch("/:budgetId/items/update-order/:type", async (req, res) => {
    const { budgetId, type } = req.params;
    const newOrder = req.body;

    if (!Array.isArray(newOrder) || newOrder.length === 0) {
        return res.status(400).json({ message: "Invalid order data" });
    }

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ message: "Budget not found" });

        for (const itemData of newOrder) {
            const item = budget.items.find((i) => i._id.toString() === itemData.id);
            if (item && item.type === type) {
                item.order = itemData.order;
            }
        }

        await budget.save();
        res.status(200).json({ message: "Order updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:budgetId/items/:itemId", async (req, res) => {
    const { budgetId, itemId } = req.params;

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ message: "Budget not found" });

        const index = budget.items.findIndex((i) => i._id.toString() === itemId);
        if (index === -1) return res.status(404).json({ message: "Item not found" });

        budget.items.splice(index, 1);

        await budget.save();

        res.json({ message: "Item deleted" });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:budgetId/items", async (req, res) => {
    const { budgetId } = req.params;

    try {
        const budget = await Budget.findById(budgetId);
        if (!budget) return res.status(404).json({ message: "Budget not found" });

        const deletedCount = budget.items.length;
        budget.items = [];
        await budget.save();

        res.status(200).json({ message: `${deletedCount} items deleted.` });
    } catch (err) {
        res.status(500).json({ message: "Error deleting items", error: err });
    }
});

export default router;
