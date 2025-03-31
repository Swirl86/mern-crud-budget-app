import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
    type: { type: String, enum: ["income", "expense"], required: true },
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
});

export default mongoose.model("Transaction", TransactionSchema);
