import axios from "axios";

const API_BASE_BUDGETS_URL = import.meta.env.VITE_BUDGET_API_BASE_URL;
const API_BASE_BUDGET_ITEMS_URL = import.meta.env.VITE_BUDGET_ITEMS_API_BASE_URL;

export const budgetsApi = axios.create({
    baseURL: API_BASE_BUDGETS_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const budgetItemsApi = axios.create({
    baseURL: API_BASE_BUDGET_ITEMS_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
