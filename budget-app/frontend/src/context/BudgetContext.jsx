import { LOADING_STATES } from "@/constants";
import { useBudgetOperations } from "@hooks/useBudgetOperations";
import { createContext, useContext } from "react";

const BudgetContext = createContext({
    budgetData: {
        title: "",
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

export const BudgetProvider = ({ children, budgetId, onDeleteBudget }) => {
    const budgetOperations = useBudgetOperations(budgetId, onDeleteBudget);
    return <BudgetContext.Provider value={budgetOperations}>{children}</BudgetContext.Provider>;
};

export const useBudget = () => {
    return useContext(BudgetContext);
};
