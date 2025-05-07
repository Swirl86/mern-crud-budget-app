export const splitByType = (budgetData) => ({
    incomeData: budgetData.filter((item) => item.type === "income"),
    expenseData: budgetData.filter((item) => item.type === "expense"),
    savingsData: budgetData.filter((item) => item.type === "saving"),
});
