import fetch from "node-fetch";
import { TEST_DATA_EXPENSES, TEST_DATA_INCOME, TEST_DATA_SAVINGS } from "./testData.js";

const API_URL = "http://localhost:5000/api/budget-items";

const deleteAll = async () => {
    try {
        const response = await fetch(`${API_URL}/delete-all`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error(`Failed to delete: ${response.statusText}`);
        }
        const result = await response.json();
        console.log("Delete result:", result);
        return result;
    } catch (error) {
        throw error;
    }
};

const seedData = async ({ deleteData }) => {
    if (deleteData) {
        try {
            const result = await deleteAll();
            console.log("All test data is deleted:", result);
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const allData = [...TEST_DATA_INCOME, ...TEST_DATA_EXPENSES, ...TEST_DATA_SAVINGS];

    for (const item of allData) {
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                throw new Error(`Error when inserting${item.category}: ${response.statusText}`);
            }

            await response.json();
            // console.log(`Added: ${data.category}`);
        } catch (error) {
            console.error(`Error: ${error.message}`);
        }
    }
};

export default seedData;
