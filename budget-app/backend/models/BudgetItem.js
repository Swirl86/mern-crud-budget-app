import mongoose from "mongoose";

const MonthlyAmountSchema = new mongoose.Schema(
    {
        januari: { type: Number, default: 0 },
        februari: { type: Number, default: 0 },
        mars: { type: Number, default: 0 },
        april: { type: Number, default: 0 },
        maj: { type: Number, default: 0 },
        juni: { type: Number, default: 0 },
        juli: { type: Number, default: 0 },
        augusti: { type: Number, default: 0 },
        september: { type: Number, default: 0 },
        oktober: { type: Number, default: 0 },
        november: { type: Number, default: 0 },
        december: { type: Number, default: 0 },
    },
    { _id: false }
);

export const BudgetItemSchema = new mongoose.Schema({
    type: { type: String, enum: ["income", "expense", "saving"], required: true },
    category: { type: String, required: true },
    amounts: { type: MonthlyAmountSchema, required: true },
    order: { type: Number, required: true },
});
