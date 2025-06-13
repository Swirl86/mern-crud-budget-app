import {
    createBudget as apiCreateBudget,
    deleteBudget as apiDeleteBudget,
    updateBudget as apiUpdateBudget,
    fetchAllBudgets,
} from "@services/api";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

const LOCAL_STORAGE_KEY = "selectedBudgetId";
const DEFAULT_BUDGET = { title: "New Budget", items: [] };

export const BudgetsContext = createContext();

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);

    useEffect(() => {
        const fetchInitialBudgets = async () => {
            try {
                const data = await fetchAllBudgets();
                let sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                if (sorted.length === 0) {
                    const newBudget = await apiCreateBudget(DEFAULT_BUDGET);
                    sorted = [newBudget];
                }

                setBudgets(sorted);

                const savedId = localStorage.getItem(LOCAL_STORAGE_KEY);
                const isValidSavedId = sorted.some((b) => b._id === savedId);

                if (isValidSavedId) {
                    setSelectedBudgetId(savedId);
                } else {
                    setSelectedBudgetId(sorted[0]._id);
                    localStorage.setItem(LOCAL_STORAGE_KEY, sorted[0]._id);
                }
            } catch (error) {
                console.error("Failed to fetch budgets", error);
            }
        };

        fetchInitialBudgets();
    }, []);

    const selectBudget = (budgetId) => {
        setSelectedBudgetId(budgetId);
        localStorage.setItem(LOCAL_STORAGE_KEY, budgetId);
    };

    const createBudget = async () => {
        try {
            const newBudget = await apiCreateBudget(DEFAULT_BUDGET);
            setBudgets((prev) => [newBudget, ...prev]);
            setSelectedBudgetId(newBudget._id);
        } catch (error) {
            console.error("Failed to create budget", error);
        }
    };

    const deleteBudget = useCallback(
        async (budgetIdToDelete) => {
            try {
                await apiDeleteBudget(budgetIdToDelete);
                const updated = budgets.filter((b) => b._id !== budgetIdToDelete);

                if (updated.length === 0) {
                    const newBudget = await apiCreateBudget(DEFAULT_BUDGET);
                    setBudgets([newBudget]);
                    setSelectedBudgetId(newBudget._id);
                    localStorage.setItem(LOCAL_STORAGE_KEY, newBudget._id);
                } else {
                    setBudgets(updated);
                    if (budgetIdToDelete === selectedBudgetId) {
                        const newActive = updated[0]._id;
                        setSelectedBudgetId(newActive);
                        localStorage.setItem(LOCAL_STORAGE_KEY, newActive);
                    }
                }
            } catch (error) {
                console.error("Failed to delete budget", error);
            }
        },
        [budgets, selectedBudgetId]
    );

    const updateBudget = async (updatedBudget) => {
        try {
            const updated = await apiUpdateBudget(updatedBudget._id, updatedBudget);
            setBudgets((prev) => prev.map((b) => (b._id === updated._id ? updated : b)));
        } catch (error) {
            console.error("Failed to update budget", error);
        }
    };

    return (
        <BudgetsContext.Provider
            value={{
                budgets,
                selectedBudgetId,
                selectBudget,
                createBudget,
                deleteBudget,
                updateBudget,
            }}
        >
            {children}
        </BudgetsContext.Provider>
    );
};

export const useBudgets = () => useContext(BudgetsContext);
