import React from "react";
import ExpenseHeader from "./expenses/ExpenseHeader.jsx";
import ExpenseRow from "./expenses/ExpenseRow.jsx";
import ExpensesFooter from "./expenses/ExpensesFooter.jsx";
import IncomeFooter from "./income/IncomeFooter.jsx";
import IncomeHeader from "./income/IncomeHeader.jsx";
import IncomeRow from "./income/IncomeRow.jsx";
import SavingsFooter from "./savings/SavingsFooter.jsx";
import SavingsHeader from "./savings/SavingsHeader.jsx";
import SavingsRow from "./savings/SavingsRow.jsx";
import ResultRow from "./total/ResultRow.jsx";

const FinancialTable = ({ budgetData }) => {
    const incomeData = budgetData.filter((item) => item.type === "income");
    const expenseData = budgetData.filter((item) => item.type === "expense");
    const savingsData = budgetData.filter((item) => item.type === "saving");

    return (
        <div className="overflow-x-auto py-6 px-10">
            <h1 className="text-2xl font-bold mb-4">Ekonomisk Översikt</h1>
            <table className="min-w-full table-auto border-collapse">
                <IncomeHeader />
                <tbody>
                    {incomeData.map((row, rowIndex) => (
                        <IncomeRow key={rowIndex} row={row} />
                    ))}
                </tbody>
                <IncomeFooter incomeData={incomeData} />

                <ExpenseHeader />
                <tbody>
                    {expenseData.map((row, rowIndex) => (
                        <ExpenseRow key={rowIndex} row={row} />
                    ))}
                </tbody>
                <ExpensesFooter expensesData={expenseData} />

                <SavingsHeader />
                <tbody>
                    {savingsData.map((row, rowIndex) => (
                        <SavingsRow key={rowIndex} row={row} />
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
