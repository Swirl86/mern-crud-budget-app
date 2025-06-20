import BudgetSection from "@/components/table/BudgetSection";
import { useBudget } from "@/context/BudgetContext";
import { exportToCSV, exportToExcel, exportToPDF } from "@/utils/budgetExportUtils";
import OverviewHeader from "@components/OverviewHeader";
import DownloadDialog from "@components/ui/DownloadDialog";
import { DragDropContext } from "@hello-pangea/dnd";
import { useFinancialTableLogic } from "@hooks/useFinancialTableLogic";
import DeleteConfirmModal from "@ui/DeleteConfirmModal";
import ErrorMessage from "@ui/ErrorMessage";
import { useEffect, useState } from "react";
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

    const [title, setTitle] = useState(budget.budgetData.title || " ✏️ ");
    const [showDownloadDialog, setShowDownloadDialog] = useState(false);

    useEffect(() => {
        setTitle(budget.budgetData.title || " ✏️ ");
    }, [budget.budgetData.title]);

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

    const handleSaveTitle = async (newTitle) => {
        await budget.saveBudgetTitle(newTitle);
        setTitle(newTitle);
    };

    const handleDownloadClick = () => {
        setShowDownloadDialog(true);
    };

    const handleCloseDownloadDialog = () => {
        setShowDownloadDialog(false);
    };

    const runExportToCSV = () => {
        exportToCSV(budget.budgetData);
        setShowDownloadDialog(false);
    };

    const runExportToPDF = () => {
        exportToPDF(budget.budgetData);
        setShowDownloadDialog(false);
    };

    const runExportToExcel = () => {
        exportToExcel(budget.budgetData);
        setShowDownloadDialog(false);
    };

    return (
        <div className="overflow-auto bg-gray-50 rounded-xl shadow-2xl p-6 sm:p-8 w-[95vw] mx-auto">
            <OverviewHeader
                title={title}
                onSaveTitle={handleSaveTitle}
                onSave={handleUpdateAllEdited}
                isSaving={isSaving}
                onDelete={openDeleteAllConfirm}
                isDeleting={isDeletingAll}
                onDownloadClick={handleDownloadClick}
            />

            {showDownloadDialog && (
                <DownloadDialog
                    onClose={handleCloseDownloadDialog}
                    onExportCSV={runExportToCSV}
                    onExportPDF={runExportToPDF}
                    onExportExcel={runExportToExcel}
                />
            )}

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
