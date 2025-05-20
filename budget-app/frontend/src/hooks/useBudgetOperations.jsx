import { ERROR_TYPES, LOADING_STATES } from "@/constants";
import { splitByType } from "@/utils/helpers";
import {
    addBudgetItem,
    deleteAllBudgetItems,
    deleteBudgetItem,
    fetchBudgetItems,
    updateBudgetItem,
    updateBudgetOrder,
} from "@services/api";
import { useEffect, useState } from "react";

export const useBudgetOperations = () => {
    const [budgetData, setBudgetData] = useState({
        income: [],
        expense: [],
        saving: [],
    });
    const [error, setError] = useState(null);
    const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);

    const isLoading = loadingState !== LOADING_STATES.IDLE;

    const resetErrors = () => setError(null);

    const loadBudgetData = async () => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.FETCHING);
            const result = await fetchBudgetItems();
            const { incomeData, expenseData, savingsData } = splitByType(result);
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
    }, []);

    const deleteAll = async () => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.DELETING_ALL);
            await deleteAllBudgetItems();
            setBudgetData([]);
        } catch (err) {
            setError({
                type: ERROR_TYPES.DELETE_ALL_ERROR,
                message: `Could not delete all items: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const deleteById = async (id) => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.DELETING_ONE);
            await deleteBudgetItem(id);
            setBudgetData(budgetData.filter((item) => item._id !== id));
        } catch (err) {
            setError({
                type: ERROR_TYPES.DELETE_ERROR,
                message: `Could not delete the item: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const addItem = async (newItem) => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.ADDING);

            const savedItem = await addBudgetItem(newItem);

            if (!savedItem.type) {
                console.error("Missing type on saved item:", savedItem);
            }

            setBudgetData((prevData) => {
                const updatedData = { ...prevData };
                if (!updatedData[savedItem.type]) {
                    console.error(`Unknown budget type: ${savedItem.type}`);
                }

                updatedData[savedItem.type] = [...(updatedData[savedItem.type] || []), savedItem];
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
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.UPDATING_ONE);
            await updateBudgetItem(updatedItem);
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
                message: `Could not delete update item: ${err.message}`,
            });
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };

    const updateItemOrder = async (type, newOrderedItems) => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.UPDATING_ORDER);
            await updateBudgetOrder(type, newOrderedItems);
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
        deleteAll,
        deleteById,
        addItem,
        updateItem,
        updateItemOrder,
    };
};
