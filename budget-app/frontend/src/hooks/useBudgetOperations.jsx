import { ERROR_TYPES, LOADING_STATES } from "@/constants";
import {
    deleteAllBudgetItems,
    deleteBudgetItem,
    //addBudgetItem,
    fetchBudgetItems,
    updateBudgetItem,
    updateBudgetOrder,
} from "@services/api";
import { useEffect, useState } from "react";

export const useBudgetOperations = () => {
    const [budgetData, setBudgetData] = useState([]);
    const [error, setError] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [loadingState, setLoadingState] = useState(LOADING_STATES.IDLE);

    const isLoading = loadingState !== LOADING_STATES.IDLE;

    const resetErrors = () => setError(null);

    const loadBudgetData = async () => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.FETCHING);
            const result = await fetchBudgetItems();
            setBudgetData(result);
        } catch (err) {
            setError({
                type: ERROR_TYPES.FETCH,
                message: `Could not fetch budget data: ${err.message}`,
            });
            setErrorType(ERROR_TYPES.FETCH_ERROR);
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

    /*
     * TODO impl
    const addItem = async (newItem) => {
        resetErrors();
        try {
            setLoading(true);
            await addBudgetItem(newItem);
            setBudgetData((prevData) => [...prevData, newItem]);
        } catch (err) {
         setError({
                type: ERROR_TYPES.ADD_ERROR,
                message: `Could not  add item: ${err.message}`,
            });
            setError(`Could not add item: ${err.message}`);
            setErrorType(ERROR_TYPES.ADD_ERROR);
        } finally {
            setLoadingState(LOADING_STATES.IDLE);
        }
    };*/

    const updateItem = async (updatedItem) => {
        resetErrors();
        try {
            setLoadingState(LOADING_STATES.UPDATING_ONE);
            await updateBudgetItem(updatedItem);
            setBudgetData((prevData) =>
                prevData.map((item) => (item._id === updatedItem._id ? updatedItem : item))
            );
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
            const updatedResponse = await fetchBudgetItems();
            /*
            TODO  Save localy one less backend call
            setBudgetData((prev) => {
                return prev.map((item) => {
                    const match = newOrderedItems.find((i) => i.id === item._id);
                    return match ? { ...item, order: match.order } : item;
                });
            });*/
            setBudgetData(updatedResponse);
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
        //addItem,
        updateItem,
        updateItemOrder,
    };
};
