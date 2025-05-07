import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import budgetRoutes from "./routes/budgetItems.js";
import seedData from "./testdata/seedBudgetData.js";

// Test data params
const USE_TEST_DATA = false;
const DELETE_CURRENT_DATA = false;

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.info("MongoDB Connected");
        if (USE_TEST_DATA) seedData(DELETE_CURRENT_DATA); // TODO remove when no more test data is needed
    })
    .catch((error) => console.error(error));

app.use("/api/budget-items", budgetRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.info(`Server running on port ${PORT}`));
