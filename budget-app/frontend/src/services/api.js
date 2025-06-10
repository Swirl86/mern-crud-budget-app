import { budgetItemsApi, budgetsApi } from "./apiClients";

// --- Budgets ---

export const fetchAllBudgets = async () => {
    const response = await budgetsApi.get("/");
    return response.data;
};

export const fetchBudgetById = async (budgetId) => {
    try {
        const response = await budgetsApi.get(`/${budgetId}`);
        return response.data;
    } catch (error) {
        console.error("Could not fetch budget", error);
        throw error;
    }
};

export const createBudget = async (budget) => {
    try {
        const response = await budgetsApi.post("/", budget);
        return response.data;
    } catch (error) {
        console.error("Could not create budget", error);
        throw error;
    }
};

export const deleteBudget = async (budgetId) => {
    try {
        await budgetsApi.delete(`/${budgetId}`);
    } catch (error) {
        console.error("Could not delete budget", error);
        throw error;
    }
};

// --- Budget Items ---

export const addBudgetItem = async (budgetId, item) => {
    try {
        const response = await budgetItemsApi.post(`/${budgetId}/items`, item);
        return response.data;
    } catch (error) {
        console.error("Could not add budget item", error);
        throw error;
    }
};

export const updateBudgetItem = async (budgetId, itemId, item) => {
    try {
        const response = await budgetItemsApi.patch(`/${budgetId}/items/${itemId}`, item);
        return response.data;
    } catch (error) {
        console.error("Could not update budget item", error);
        throw error;
    }
};

export const updateBudgetItemOrder = async (budgetId, type, newOrder) => {
    try {
        const response = await budgetItemsApi.patch(
            `/${budgetId}/items/update-order/${type}`,
            newOrder
        );
        return response.data;
    } catch (error) {
        console.error("Could not update item order", error);
        throw error;
    }
};

export const deleteBudgetItem = async (budgetId, itemId) => {
    try {
        await budgetItemsApi.delete(`/${budgetId}/items/${itemId}`);
    } catch (error) {
        console.error("Could not delete item", error);
        throw error;
    }
};

export const deleteAllBudgetItems = async (budgetId) => {
    try {
        const response = await budgetItemsApi.delete(`/${budgetId}/items`);
        if (!response.status.toString().startsWith("2")) {
            throw new Error("Failed to delete all budget items");
        }
    } catch (error) {
        console.error("Could not delete all budget items", error);
        throw error;
    }
};

const budgetService = {
    fetchAllBudgets,
    fetchBudgetById,
    createBudget,
    deleteBudget,
    addBudgetItem,
    updateBudgetItem,
    updateBudgetItemOrder,
    deleteBudgetItem,
    deleteAllBudgetItems,
};

export default budgetService;
