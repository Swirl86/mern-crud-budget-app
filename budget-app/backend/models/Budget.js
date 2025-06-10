import mongoose from "mongoose";
import { BudgetItemSchema } from "./BudgetItem.js";

const BudgetSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        items: [BudgetItemSchema],
    },
    { timestamps: true }
);

export default mongoose.model("Budget", BudgetSchema);
