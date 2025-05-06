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
    const response = await api.post("/", budgetItem);
    return response.data;
};

export const updateBudgetItem = async (budgetItem) => {
    try {
        const response = await api.patch(`/${budgetItem._id}`, budgetItem);
        return response.data;
    } catch (err) {
        throw new Error(err.response?.data?.message || err.message);
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
    deleteAllBudgetItems,
    deleteBudgetItem,
};

export default budgetService;
