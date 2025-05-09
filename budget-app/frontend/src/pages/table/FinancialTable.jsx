import { LOADING_STATES } from "@/constants";
import { useBudget } from "@/context/BudgetContext";
import { splitByType } from "@/utils/helpers";
import SavingIndicator from "@components/SavingIndicator";
import ErrorMessage from "@ui/ErrorMessage";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { FaSave } from "react-icons/fa";
import BudgetSection from "./components/BudgetSection";
import {
    ExpenseHeader,
    ExpensesFooter,
    IncomeFooter,
    IncomeHeader,
    ResultRow,
    SavingsFooter,
    SavingsHeader,
} from "./tableImports.js";

const FinancialTable = () => {
    const {
        budgetData,
        error,
        loadingState,
        isLoading,
        deleteAll,
        deleteById,
        //addItem,
        updateItem,
        updateItemOrder,
    } = useBudget();

    const [sectionData, setSectionData] = useState({
        income: [],
        expense: [],
        saving: [],
    });
    const [editedRows, setEditedRows] = useState([]);

    const isDeletingAll = loadingState === LOADING_STATES.DELETING_ALL;
    const isUpdating = loadingState === LOADING_STATES.UPDATING_ONE;
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const { incomeData, expenseData, savingsData } = splitByType(budgetData);
        setSectionData({
            income: incomeData,
            expense: expenseData,
            saving: savingsData,
        });
    }, [budgetData]);

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

    const handlUpdateAllEdited = async () => {
        if (isSaving || isUpdating) return; // Prevent multiple saves at once
        setIsSaving(true);
        try {
            for (const row of editedRows) {
                await updateItem(row);
            }
            setEditedRows([]);
        } catch (error) {
            console.error("Failed to save edited row(s):", error);
        } finally {
            setIsSaving(false);
        }
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                //console.log("CTRL-key save all");
                handlUpdateAllEdited();
            }
            if (e.key === "Enter") {
                e.preventDefault();
                handlUpdateAllEdited();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [editedRows]);

    // Autoupdate every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            //console.log("Auto Save");
            handlUpdateAllEdited();
        }, 30000);
        return () => clearInterval(interval);
    }, [editedRows]);

    // Handle the drag and drop event to update the order
    const handleDragEnd = async ({ source, destination }) => {
        if (!destination) return;

        const sourceItems = Array.from(sectionData[source.droppableId]);
        const [moved] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, moved);

        const newOrder = sourceItems.map((item, index) => ({
            id: item._id,
            order: index,
        }));

        try {
            await updateItemOrder(source.droppableId, newOrder);
            setSectionData((prev) => ({
                ...prev,
                [source.droppableId]: sourceItems,
            }));
        } catch (err) {
            console.error("Failed to update order:", err);
        }
    };

    return (
        <div className="overflow-auto bg-gray-50 rounded-xl shadow-2xl p-6 w-[95vw] mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-semibold text-gray-800">Ekonomisk Översikt</h1>
                    <FaSave
                        onClick={handlUpdateAllEdited}
                        className="ml-4 w-8 h-8 text-green-600 cursor-pointer"
                    />
                    {isSaving && <SavingIndicator />}
                </div>
                <button
                    onClick={deleteAll}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                    disabled={isDeletingAll}
                >
                    Rensa Alla Data
                </button>
            </div>
            {error && <ErrorMessage message={error.message || "Ett fel uppstod vid sparning."} />}
            <DragDropContext onDragEnd={handleDragEnd}>
                <table className="min-w-full table-auto border-collapse">
                    <IncomeHeader />
                    <BudgetSection
                        data={sectionData.income}
                        sectionId="income"
                        type="income"
                        onUpdateRow={handleUpdateRow}
                    />
                    <IncomeFooter incomeData={sectionData.income} />
                    <ExpenseHeader />
                    <BudgetSection
                        data={sectionData.expense}
                        sectionId="expense"
                        type="expense"
                        onUpdateRow={handleUpdateRow}
                    />
                    <ExpensesFooter expensesData={sectionData.expense} />
                    <SavingsHeader />
                    <BudgetSection
                        data={sectionData.saving}
                        sectionId="saving"
                        type="saving"
                        onUpdateRow={handleUpdateRow}
                    />
                    <SavingsFooter savingsData={sectionData.saving} />
                    <ResultRow
                        incomeData={sectionData.income}
                        expensesData={sectionData.expense}
                        savingsData={sectionData.saving}
                    />
                </table>
            </DragDropContext>
        </div>
    );
};

export default FinancialTable;
