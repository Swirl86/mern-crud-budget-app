import { BudgetTypes, TABLE_MONTHS } from "@/constants";

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

export const createDefaultBudgetItemWithType = (type, currentLength = 0) => {
    const amounts = TABLE_MONTHS.reduce((acc, month, _) => {
        const monthKey = month.toLowerCase();
        acc[monthKey] = 0;
        return acc;
    }, {});

    return {
        type,
        category: "Ny kategori",
        amounts: amounts,
        order: currentLength,
    };
};
