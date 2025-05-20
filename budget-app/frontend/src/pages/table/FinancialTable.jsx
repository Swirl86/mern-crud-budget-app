import { LOADING_STATES } from "@/constants";
import { useBudget } from "@/context/BudgetContext";
import { createDefaultBudgetItemWithType } from "@/utils/helpers";
import { DragDropContext } from "@hello-pangea/dnd";
import DeleteConfirmModal from "@ui/DeleteConfirmModal";
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
    const [deleteId, setDeleteId] = useState(null);

    const isDeletingAll = budget.loadingState === LOADING_STATES.DELETING_ALL;
    const isDeleting = budget.loadingState === LOADING_STATES.DELETING_ONE;
    const isUpdating = budget.loadingState === LOADING_STATES.UPDATING_ONE;
    const isAdding = budget.loadingState === LOADING_STATES.ADDING;
    const canShowDeleteModal = deleteId && !isSaving && !isDeleting;

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
            setError({ type: ERROR_TYPES.UPDATE, message: error.message });
            throw error;
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
            setError({ type: ERROR_TYPES.ADD_ERROR, message: error.message });
            throw error;
        } finally {
            setIsSaving(false);
        }
    };

    const confirmDelete = async () => {
        try {
            setIsSaving(true);

            await budget.deleteById(deleteId);
        } catch (error) {
            setError({ type: ERROR_TYPES.DELETE_ERROR, message: error.message });
            throw error;
        } finally {
            setIsSaving(false);
            closeDeleteConfirm();
        }
    };

    const openDeleteConfirm = (id) => {
        setDeleteId(id);
    };

    const closeDeleteConfirm = () => {
        setDeleteId(null);
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

            {budget.error && <ErrorMessage message={budget.error.message} />}

            {canShowDeleteModal && (
                <DeleteConfirmModal onConfirm={confirmDelete} onCancel={closeDeleteConfirm} />
            )}

            <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                <table className="min-w-full border-collapse table-fixed text-left rtl:text-right">
                    <IncomeHeader onAdd={handleAddRow} />

                    <BudgetSection
                        data={sectionData.income}
                        sectionId="income"
                        type="income"
                        onUpdateRow={handleUpdateRow}
                        openDeleteConfirm={openDeleteConfirm}
                        activeDroppableId={activeDroppableId}
                    />
                    <IncomeFooter incomeData={sectionData.income} />

                    <ExpenseHeader onAdd={handleAddRow} />
                    <BudgetSection
                        data={sectionData.expense}
                        sectionId="expense"
                        type="expense"
                        onUpdateRow={handleUpdateRow}
                        openDeleteConfirm={openDeleteConfirm}
                        activeDroppableId={activeDroppableId}
                    />
                    <ExpensesFooter expensesData={sectionData.expense} />

                    <SavingsHeader onAdd={handleAddRow} />
                    <BudgetSection
                        data={sectionData.saving}
                        sectionId="saving"
                        type="saving"
                        onUpdateRow={handleUpdateRow}
                        openDeleteConfirm={openDeleteConfirm}
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
