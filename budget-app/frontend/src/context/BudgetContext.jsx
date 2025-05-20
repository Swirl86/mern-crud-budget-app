import { LOADING_STATES } from "@/constants";
import { useBudgetOperations } from "@hooks/useBudgetOperations.jsx";
import { createContext, useContext } from "react";

const BudgetContext = createContext({
    budgetData: {
        income: [],
        expense: [],
        saving: [],
    },
    error: null,
    loadingState: LOADING_STATES.IDLE,
    isLoading: false,
    deleteAll: () => {},
    deleteById: () => {},
    addItem: () => {},
    updateItem: () => {},
    updateItemOrder: () => {},
});

export const BudgetProvider = ({ children }) => {
    const {
        budgetData,
        error,
        loadingState,
        isLoading,
        deleteAll,
        deleteById,
        addItem,
        updateItem,
        updateItemOrder,
    } = useBudgetOperations();

    return (
        <BudgetContext.Provider
            value={{
                budgetData,
                error,
                loadingState,
                isLoading,
                deleteAll,
                deleteById,
                addItem,
                updateItem,
                updateItemOrder,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => useContext(BudgetContext);
