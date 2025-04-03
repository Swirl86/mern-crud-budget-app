import { TEST_DATA_EXPENSES, TEST_DATA_INCOME, TEST_DATA_SAVINGS } from "@/testData";
import React from "react";
import ExpenseHeader from "./expenses/ExpenseHeader.jsx";
import ExpenseRow from "./expenses/ExpenseRow.jsx";
import ExpensesFooter from "./expenses/ExpensesFooter.jsx";
import IncomeFooter from "./income/IncomeFooter.jsx";
import IncomeHeader from "./income/IncomeHeader.jsx";
import IncomeRow from "./income/IncomeRow.jsx";
import SavingsHeader from "./savings/SavingsHeader.jsx";
import SavingsRow from "./savings/SavingsRow.jsx";
import ResultRow from "./total/ResultRow.jsx";

const FinancialTable = () => {
    return (
        <div className="overflow-x-auto py-6 px-10">
            <h1 className="text-2xl font-bold mb-4">Ekonomisk Översikt</h1>
            <table className="min-w-full table-auto border-collapse">
                <IncomeHeader />
                <tbody>
                    {TEST_DATA_INCOME.map((row, rowIndex) => (
                        <IncomeRow key={rowIndex} row={row} />
                    ))}
                </tbody>
                <IncomeFooter incomeData={TEST_DATA_INCOME} />

                <ExpenseHeader />
                <tbody>
                    {TEST_DATA_EXPENSES.map((row, rowIndex) => (
                        <ExpenseRow key={rowIndex} row={row} />
                    ))}
                </tbody>
                <ExpensesFooter expensesData={TEST_DATA_EXPENSES} />

                <SavingsHeader />
                <tbody>
                    {TEST_DATA_SAVINGS.map((row, rowIndex) => (
                        <SavingsRow key={rowIndex} row={row} />
                    ))}
                </tbody>

                <ResultRow
                    incomeData={TEST_DATA_INCOME}
                    expensesData={TEST_DATA_EXPENSES}
                    savingsData={TEST_DATA_SAVINGS}
                />
            </table>
        </div>
    );
};

export default FinancialTable;
