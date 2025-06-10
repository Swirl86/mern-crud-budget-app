import fetch from "node-fetch";
import { TEST_DATA_EXPENSES, TEST_DATA_INCOME, TEST_DATA_SAVINGS } from "./testData.js";

const API_URL = "http://localhost:5000/api/budgets";

const deleteAllBudgets = async () => {
    try {
        const getRes = await fetch(API_URL);
        const budgets = await getRes.json();

        for (const budget of budgets) {
            const delRes = await fetch(`${API_URL}/${budget._id}`, {
                method: "DELETE",
            });

            if (!delRes.ok) {
                throw new Error(`Failed to delete budget ${budget._id}: ${delRes.statusText}`);
            }
        }

        console.log(`Deleted ${budgets.length} budgets`);
    } catch (error) {
        console.error("Error deleting budgets:", error);
    }
};

const seedBudgets = async (deleteData = false) => {
    if (deleteData) {
        await deleteAllBudgets();
    }

    const allItems = [...TEST_DATA_INCOME, ...TEST_DATA_EXPENSES, ...TEST_DATA_SAVINGS];

    const budget = {
        title: "Testbudget 2025",
        items: allItems.map((item, index) => ({
            ...item,
            order: index,
        })),
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(budget),
        });

        if (!response.ok) {
            throw new Error(`Failed to insert budget: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Seeded budget:", result.title);
    } catch (error) {
        console.error("Error seeding budget:", error);
    }
};

export default seedBudgets;
