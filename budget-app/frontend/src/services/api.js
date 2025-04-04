import axios from "axios";

const BUDGET_API_BASE_URL = import.meta.env.VITE_BUDGET_API_BASE_URL;

export const fetchBudgetItems = async () => {
    const response = await axios.get(BUDGET_API_BASE_URL);
    return response.data;
};

export const addBudgetItem = async (budgetItem) => {
    const response = await axios.post(BUDGET_API_BASE_URL, budgetItem);
    return response.data;
};

export const deleteBudgetItem = async (id) => {
    await axios.delete(`${BUDGET_API_BASE_URL}/${id}`);
};
