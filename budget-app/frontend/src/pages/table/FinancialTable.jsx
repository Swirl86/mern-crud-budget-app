import ErrorMessage from "@ui/ErrorMessage";
import React from "react";
import BudgetRow from "./BudgetRow.jsx";
import ExpenseHeader from "./expenses/ExpenseHeader.jsx";
import ExpensesFooter from "./expenses/ExpensesFooter.jsx";
import IncomeFooter from "./income/IncomeFooter.jsx";
import IncomeHeader from "./income/IncomeHeader.jsx";
import SavingsFooter from "./savings/SavingsFooter.jsx";
import SavingsHeader from "./savings/SavingsHeader.jsx";
import ResultRow from "./total/ResultRow.jsx";

const FinancialTable = ({ budgetData, onDeleteAll, deleteAllLoading, deleteAllError }) => {
    const incomeData = budgetData.filter((item) => item.type === "income");
    const expenseData = budgetData.filter((item) => item.type === "expense");
    const savingsData = budgetData.filter((item) => item.type === "saving");

    const handleUpdateRow = (updatedRow) => {
        // TODO Update the data with the new row information
        // Listen for ctr + s, have timer save every 30sec or 60sec if somthing changed, add save all button
        console.log("Updated Row: ", updatedRow);
    };

    return (
        <div className="overflow-auto bg-gray-50 rounded-xl shadow-2xl p-6 w-[95vw] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-semibold text-gray-800">Ekonomisk Översikt</h1>
                {deleteAllError && <ErrorMessage message={deleteAllError} />}
                <button
                    onClick={onDeleteAll}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    disabled={deleteAllLoading}
                >
                    Rensa Alla Data
                </button>
            </div>
            <table className="min-w-full table-auto border-collapse">
                <IncomeHeader />
                <tbody>
                    {incomeData.map((row, rowIndex) => (
                        <BudgetRow
                            key={rowIndex}
                            row={row}
                            type="income"
                            onUpdateRow={handleUpdateRow}
                        />
                    ))}
                </tbody>
                <IncomeFooter incomeData={incomeData} />

                <ExpenseHeader />
                <tbody>
                    {expenseData.map((row, rowIndex) => (
                        <BudgetRow
                            key={rowIndex}
                            row={row}
                            type="expense"
                            onUpdateRow={handleUpdateRow}
                        />
                    ))}
                </tbody>
                <ExpensesFooter expensesData={expenseData} />

                <SavingsHeader />
                <tbody>
                    {savingsData.map((row, rowIndex) => (
                        <BudgetRow
                            key={rowIndex}
                            row={row}
                            type="saving"
                            onUpdateRow={handleUpdateRow}
                        />
                    ))}
                </tbody>
                <SavingsFooter savingsData={savingsData} />

                <ResultRow
                    incomeData={incomeData}
                    expensesData={expenseData}
                    savingsData={savingsData}
                />
            </table>
        </div>
    );
};

export default FinancialTable;
