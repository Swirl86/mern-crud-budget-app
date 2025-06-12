import { ERROR_TYPES, LOADING_STATES } from "@/constants";
import { splitByType } from "@/utils/helpers";
import {
    addBudgetItem,
    deleteAllBudgetItems,
    deleteBudgetItem,
    fetchBudgetById,
    updateBudgetItem,
    updateBudgetItemOrder,
} from "@services/api";
import { useEffect, useState } from "react";

export const useBudgetOperations = (budgetId, onDeleteBudget) => {
    const [budgetData, setBudgetData] = useState({
        income: [],
        expense: [],
        saving: [],
    });
    const [error, setError] = useState(null);
    const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);

    const isLoading = loadingState !== LOADING_STATES.IDLE;

    const resetErrors = () => setError(null);

    // --- Budgets ---

    const loadBudgetData = async () => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.FETCHING);
            const result = await fetchBudgetById(budgetId);
            const { incomeData, expenseData, savingsData } = splitByType(result.items);
            setBudgetData({
                income: incomeData,
                expense: expenseData,
                saving: savingsData,
            });
        } catch (err) {
            setError({
                type: ERROR_TYPES.FETCH,
                message: `Could not fetch budget data: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    useEffect(() => {
        loadBudgetData();
    }, [budgetId]);

    const deleteEntireBudget = async () => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.DELETING_BUDGET);
            await onDeleteBudget(budgetId);
            setBudgetData({ income: [], expense: [], saving: [] });
        } catch (err) {
            setError({
                type: ERROR_TYPES.DELETE_BUDGET_ERROR,
                message: `Could not delete budget: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    // --- Budget Items ---

    const clearAllItems = async () => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.CLEARING_ALL_ITEMS);
            await deleteAllBudgetItems(budgetId);
            setBudgetData({
                income: [],
                expense: [],
                saving: [],
            });
        } catch (err) {
            setError({
                type: ERROR_TYPES.CLEAR_ALL_ITEMS_ERROR,
                message: `Could not clear all items: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const deleteItemById = async (id) => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.DELETING_ITEM);
            await deleteBudgetItem(budgetId, id);
            setBudgetData((prevData) => {
                const updatedData = {};
                for (const key of Object.keys(prevData)) {
                    updatedData[key] = prevData[key].filter((item) => item._id !== id);
                }
                return updatedData;
            });
        } catch (err) {
            setError({
                type: ERROR_TYPES.DELETE_ITEM_ERROR,
                message: `Could not delete the item: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const addItem = async (newItem) => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.ADDING);
            const savedItem = await addBudgetItem(budgetId, newItem);

            if (!savedItem.type) {
                console.error("Missing type on saved item:", savedItem);
            }

            setBudgetData((prevData) => {
                const updatedData = { ...prevData };
                if (!updatedData[savedItem.type]) {
                    console.error(`Unknown budget type: ${savedItem.type}`);
                    updatedData[savedItem.type] = [];
                }
                updatedData[savedItem.type] = [...updatedData[savedItem.type], savedItem];
                return updatedData;
            });
        } catch (err) {
            setError({
                type: ERROR_TYPES.ADD_ERROR,
                message: `Could not add item: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const updateItem = async (updatedItem) => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.UPDATING_ITEM);
            await updateBudgetItem(budgetId, updatedItem._id, updatedItem);
            setBudgetData((prevData) => {
                const updatedData = { ...prevData };
                Object.keys(updatedData).forEach((type) => {
                    updatedData[type] = updatedData[type].map((item) =>
                        item._id === updatedItem._id ? updatedItem : item
                    );
                });
                return updatedData;
            });
        } catch (err) {
            setError({
                type: ERROR_TYPES.UPDATE_ERROR,
                message: `Could not update item: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const updateItemOrder = async (type, newOrderedItems) => {
        if (!budgetId) return;
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.UPDATING_ORDER);
            await updateBudgetItemOrder(budgetId, type, newOrderedItems);
            setBudgetData((prev) => {
                const updatedData = { ...prev };
                updatedData[type] = updatedData[type].map((item) => {
                    const match = newOrderedItems.find((i) => i.id === item._id);
                    return match ? { ...item, order: match.order } : item;
                });
                updatedData[type] = updatedData[type].sort((a, b) => a.order - b.order);
                return updatedData;
            });
        } catch (err) {
            setError({
                type: ERROR_TYPES.REORDER_ERROR,
                message: `Could not update order: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    return {
        budgetData,
        error,
        loadingState,
        isLoading,
        clearAllItems,
        deleteItemById,
        deleteEntireBudget,
        addItem,
        updateItem,
        updateItemOrder,
        setError,
    };
};
