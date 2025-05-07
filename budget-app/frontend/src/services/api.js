import axios from "axios";

const BUDGET_API_BASE_URL = import.meta.env.VITE_BUDGET_API_BASE_URL;

const api = axios.create({
    baseURL: BUDGET_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const fetchBudgetItems = async () => {
    try {
        const response = await api.get("/");
        return response.data;
    } catch (error) {
        console.error("Could not fetch budgetdata", error);
        throw error;
    }
};

export const addBudgetItem = async (budgetItem) => {
    try {
        const response = await api.post("/", budgetItem);
        return response.data;
    } catch (error) {
        console.error("Could not add budgetdata", error);
        throw error;
    }
};

export const updateBudgetItem = async (budgetItem) => {
    try {
        const response = await api.patch(`/${budgetItem._id}`, budgetItem);
        return response.data;
    } catch (err) {
        console.error("Could not update budgetdata", err);
        throw new Error(err.response?.data?.message || err.message);
    }
};

export const updateBudgetOrder = async (type, newOrderedItems) => {
    try {
        const response = await api.patch(`/update-order/${type}`, newOrderedItems);
        return response.data;
    } catch (error) {
        console.error("Could not update budget item order", error);
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const deleteAllBudgetItems = async () => {
    await api.delete("/delete-all");
};

export const deleteBudgetItem = async (id) => {
    await api.delete(`/${id}`);
};

const budgetService = {
    fetchBudgetItems,
    addBudgetItem,
    updateBudgetItem,
    updateBudgetOrder,
    deleteAllBudgetItems,
    deleteBudgetItem,
};

export default budgetService;
