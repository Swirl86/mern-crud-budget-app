import { BudgetTypes } from "@/constants";

export const splitByType = (budgetData) => ({
    incomeData: budgetData.filter((item) => item.type === "income"),
    expenseData: budgetData.filter((item) => item.type === "expense"),
    savingsData: budgetData.filter((item) => item.type === "saving"),
});

export function getTextColorByType(type) {
    switch (type) {
        case BudgetTypes.INCOME:
            return "text-green-500";
        case BudgetTypes.EXPENSE:
            return "text-red-500";
        case BudgetTypes.SAVING:
            return "text-blue-500";
        default:
            return "text-gray-500";
    }
}
