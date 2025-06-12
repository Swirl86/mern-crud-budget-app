import BudgetSection from "@/components/table/BudgetSection";
import { useBudget } from "@/context/BudgetContext";
import OverviewHeader from "@components/OverviewHeader";
import { DragDropContext } from "@hello-pangea/dnd";
import { useFinancialTableLogic } from "@hooks/useFinancialTableLogic";
import DeleteConfirmModal from "@ui/DeleteConfirmModal";
import ErrorMessage from "@ui/ErrorMessage";
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
    const budget = useBudget();
    const sectionData = {
        income: budget.budgetData.income || [],
        expense: budget.budgetData.expense || [],
        saving: budget.budgetData.saving || [],
    };

    const {
        isSaving,
        openDeleteConfirm,
        closeDeleteConfirm,
        activeDroppableId,
        isDeletingAll,
        showDeleteAllModal,
        openDeleteAllConfirm,
        closeDeleteAllConfirm,
        confirmDeleteAll,
        canShowDeleteModal,
        handleUpdateAllEdited,
        handleAddRow,
        handleUpdateRow,
        confirmDelete,
        handleDragStart,
        handleDragEnd,
    } = useFinancialTableLogic(budget);

    return (
        <div className="overflow-auto bg-gray-50 rounded-xl shadow-2xl p-6 sm:p-8 w-[95vw] mx-auto">
            <OverviewHeader
                onSave={handleUpdateAllEdited}
                isSaving={isSaving}
                onDelete={openDeleteAllConfirm}
                isDeleting={isDeletingAll}
            />

            {budget.error && <ErrorMessage message={budget.error.message} />}

            {showDeleteAllModal && (
                <DeleteConfirmModal
                    onConfirm={confirmDeleteAll}
                    onCancel={closeDeleteAllConfirm}
                    text="Är du säker på att du vill ta bort HELA denna budget? Det går inte att ångra."
                />
            )}

            {canShowDeleteModal && (
                <DeleteConfirmModal onConfirm={confirmDelete} onCancel={closeDeleteConfirm} />
            )}

            <DragDropContext
                onDragEnd={(result) => handleDragEnd(result, sectionData)}
                onDragStart={handleDragStart}
            >
                <table className="min-w-full border-collapse table-fixed text-left rtl:text-right">
                    <IncomeHeader onAdd={(type) => handleAddRow(type, sectionData)} />
                    <BudgetSection
                        data={sectionData.income}
                        sectionId="income"
                        type="income"
                        onUpdateRow={handleUpdateRow}
                        openDeleteConfirm={openDeleteConfirm}
                        activeDroppableId={activeDroppableId}
                    />
                    <IncomeFooter incomeData={sectionData.income} />

                    <ExpenseHeader onAdd={(type) => handleAddRow(type, sectionData)} />
                    <BudgetSection
                        data={sectionData.expense}
                        sectionId="expense"
                        type="expense"
                        onUpdateRow={handleUpdateRow}
                        openDeleteConfirm={openDeleteConfirm}
                        activeDroppableId={activeDroppableId}
                    />
                    <ExpensesFooter expensesData={sectionData.expense} />

                    <SavingsHeader onAdd={(type) => handleAddRow(type, sectionData)} />
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
