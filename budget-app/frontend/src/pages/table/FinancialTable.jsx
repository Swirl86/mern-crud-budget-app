import { LOADING_STATES } from "@/constants";
import { useBudget } from "@/context/BudgetContext";
import { createDefaultBudgetItemWithType } from "@/utils/helpers";
import { DragDropContext } from "@hello-pangea/dnd";
import ErrorMessage from "@ui/ErrorMessage";
import { useEffect, useState } from "react";
import BudgetSection from "./components/BudgetSection";
import {
    ExpenseHeader,
    ExpensesFooter,
    IncomeFooter,
    IncomeHeader,
    OverviewHeader,
    ResultRow,
    SavingsFooter,
    SavingsHeader,
} from "./tableImports.js";

const FinancialTable = () => {
    const budget = useBudget();
    const sectionData = {
        income: budget.budgetData.income || [],
        expense: budget.budgetData.expense || [],
        saving: budget.budgetData.saving || [],
    };
    const [editedRows, setEditedRows] = useState([]);
    const [activeDroppableId, setActiveDroppableId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const isDeletingAll = budget.loadingState === LOADING_STATES.DELETING_ALL;
    const isUpdating = budget.loadingState === LOADING_STATES.UPDATING_ONE;
    const isAdding = budget.loadingState === LOADING_STATES.ADDING;

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

    const handleDragStart = (start) => {
        setActiveDroppableId(start.source.droppableId);
    };

    const handleUpdateRow = (updatedRow) => {
        setEditedRows((prev) => {
            const exists = prev.some((r) => r._id === updatedRow._id);
            if (exists) {
                return prev.map((r) => (r._id === updatedRow._id ? updatedRow : r));
            }
            return [...prev, updatedRow];
        });
    };

    const handlUpdateAllEdited = async () => {
        if (isSaving || isUpdating) return; // Prevent multiple saves at once

        try {
            setIsSaving(true);
            for (const row of editedRows) {
                await budget.updateItem(row);
            }
            setEditedRows([]);
        } catch (error) {
            console.error("Failed to save edited row(s):", error);
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddRow = async (type) => {
        if (isSaving || isAdding) return;

        try {
            setIsSaving(true);

            const lastOrder = sectionData[type]?.length || 0;
            const newItem = createDefaultBudgetItemWithType(type, lastOrder);

            await budget.addItem(newItem);
        } catch (error) {
            console.error("Failed to add row:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // Handle the drag and drop event to update the order
    const handleDragEnd = async ({ source, destination }) => {
        setActiveDroppableId(null);

        if (!destination || source.droppableId !== destination.droppableId) return;

        const sourceItems = Array.from(sectionData[source.droppableId]);
        const [moved] = sourceItems.splice(source.index, 1);
        sourceItems.splice(destination.index, 0, moved);

        const newOrder = sourceItems.map((item, index) => ({
            id: item._id,
            order: index,
        }));

        try {
            await budget.updateItemOrder(source.droppableId, newOrder);
        } catch (err) {
            console.error("Failed to update order:", err);
        }
    };

    return (
        <div className="overflow-auto bg-gray-50 rounded-xl shadow-2xl p-6 sm:p-8 w-[95vw] mx-auto">
            <OverviewHeader
                onSave={handlUpdateAllEdited}
                isSaving={isSaving}
                onDelete={budget.deleteAll}
                isDeleting={isDeletingAll}
            />

            {budget.error && (
                <ErrorMessage message={budget.error.message || "Ett fel uppstod vid sparning."} />
            )}

            <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <table className="min-w-full border-collapse table-fixed text-left rtl:text-right">
                    {isAdding && (
                        <tr key="adding-placeholder">
                            <td colSpan={6} className="py-2 text-center text-gray-400 italic">
                                Lägger till rad...
                            </td>
                        </tr>
                    )}
                    <IncomeHeader onAdd={handleAddRow} />

                    <BudgetSection
                        data={sectionData.income}
                        sectionId="income"
                        type="income"
                        onUpdateRow={handleUpdateRow}
                        activeDroppableId={activeDroppableId}
                    />
                    <IncomeFooter incomeData={sectionData.income} />

                    <ExpenseHeader onAdd={handleAddRow} />
                    <BudgetSection
                        data={sectionData.expense}
                        sectionId="expense"
                        type="expense"
                        onUpdateRow={handleUpdateRow}
                        activeDroppableId={activeDroppableId}
                    />
                    <ExpensesFooter expensesData={sectionData.expense} />

                    <SavingsHeader onAdd={handleAddRow} />
                    <BudgetSection
                        data={sectionData.saving}
                        sectionId="saving"
                        type="saving"
                        onUpdateRow={handleUpdateRow}
                        activeDroppableId={activeDroppableId}
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
