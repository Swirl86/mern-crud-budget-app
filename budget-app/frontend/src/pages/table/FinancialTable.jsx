import SavingIndicator from "@components/SavingIndicator";
import useUpdateBudgetItems from "@hooks/useUpdateBudgetItems";
import ErrorMessage from "@ui/ErrorMessage";
import { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
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

    const [editedRows, setEditedRows] = useState([]);
    const { updateItem, isUpdating, error } = useUpdateBudgetItems();

    const handleUpdateRow = (updatedRow) => {
        setEditedRows((prev) => {
            const index = prev.findIndex((r) => r._id === updatedRow._id);
            if (index !== -1) {
                const updated = [...prev];
                updated[index] = updatedRow;
                return updated;
            }
            return [...prev, updatedRow];
        });
    };

    const handlUpdateAll = async () => {
        try {
            for (const row of editedRows) {
                await updateItem(row);
            }
            setEditedRows([]);
        } catch (error) {
            console.error("Failed to save rows:", error);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                console.log("CTRL-key save all");
                handlUpdateAll();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [editedRows]);

    // Autoupdate every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            console.log("Auto Save");
            handlUpdateAll();
        }, 30000);
        return () => clearInterval(interval);
    }, [editedRows]);

    return (
        <div className="overflow-auto bg-gray-50 rounded-xl shadow-2xl p-6 w-[95vw] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-semibold text-gray-800">Ekonomisk Översikt</h1>
                    <FaSave
                        onClick={handlUpdateAll}
                        className="ml-4 w-8 h-8 text-green-600 cursor-pointer"
                    />
                    {isUpdating && <SavingIndicator />}
                </div>
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
                {error && (
                    <ErrorMessage message={error.message || "Ett fel uppstod vid sparning."} />
                )}
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
