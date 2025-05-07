import { splitByType } from "@/utils/helpers";
import SavingIndicator from "@components/SavingIndicator";
import { useUpdateBudgetItems, useUpdateBudgetOrder } from "@hooks";
import ErrorMessage from "@ui/ErrorMessage";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { FaSave } from "react-icons/fa";
import {
    BudgetRow,
    ExpenseHeader,
    ExpensesFooter,
    IncomeFooter,
    IncomeHeader,
    ResultRow,
    SavingsFooter,
    SavingsHeader,
} from "./tableImports.js";

const FinancialTable = ({ budgetData, onDeleteAll, deleteAllLoading, deleteAllError }) => {
    const [incomeData, setIncomeData] = useState([]);
    const [expenseData, setExpenseData] = useState([]);
    const [savingsData, setSavingsData] = useState([]);
    const [editedRows, setEditedRows] = useState([]);

    const { updateItemOrder } = useUpdateBudgetOrder();
    const { updateItem, isUpdating, error } = useUpdateBudgetItems();

    useEffect(() => {
        const { incomeData, expenseData, savingsData } = splitByType(budgetData);
        setIncomeData(incomeData);
        setExpenseData(expenseData);
        setSavingsData(savingsData);
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
                //console.log("CTRL-key save all");
                handlUpdateAll();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [editedRows]);

    // Autoupdate every 30 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            //console.log("Auto Save");
            handlUpdateAll();
        }, 30000);
        return () => clearInterval(interval);
    }, [editedRows]);

    // Handle the drag and drop event to update the order
    const handleDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return;

        // Define sections (income, expense, saving) for drag-and-drop
        const sections = {
            income: [incomeData, setIncomeData],
            expense: [expenseData, setExpenseData],
            saving: [savingsData, setSavingsData],
        };

        const [items, setItems] = sections[source.droppableId];
        const updated = [...items];
        const [moved] = updated.splice(source.index, 1);
        updated.splice(destination.index, 0, moved);

        try {
            await updateItemOrder(
                source.droppableId,
                updated.map((item, index) => ({ id: item._id, order: index }))
            );

            setItems(updated);
        } catch (error) {
            console.error("Failed to update order:", error);
            // Todo add error message
        }
    };

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
            <DragDropContext onDragEnd={handleDragEnd}>
                <table className="min-w-full table-auto border-collapse">
                    <IncomeHeader />
                    {error && (
                        <ErrorMessage message={error.message || "Ett fel uppstod vid sparning."} />
                    )}
                    <Droppable droppableId="income">
                        {(provided) => (
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                {incomeData.map((row, rowIndex) => (
                                    <Draggable
                                        key={row._id}
                                        draggableId={row._id.toString()}
                                        index={rowIndex}
                                    >
                                        {(provided) => (
                                            <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <BudgetRow
                                                    row={row}
                                                    type="income"
                                                    onUpdateRow={handleUpdateRow}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>
                    <IncomeFooter incomeData={incomeData} />

                    <ExpenseHeader />
                    <Droppable droppableId="expense">
                        {(provided) => (
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                {expenseData.map((row, rowIndex) => (
                                    <Draggable
                                        key={row._id}
                                        draggableId={row._id.toString()}
                                        index={rowIndex}
                                    >
                                        {(provided) => (
                                            <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <BudgetRow
                                                    row={row}
                                                    type="expense"
                                                    onUpdateRow={handleUpdateRow}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>
                    <ExpensesFooter expensesData={expenseData} />

                    <SavingsHeader />
                    <Droppable droppableId="saving">
                        {(provided) => (
                            <tbody ref={provided.innerRef} {...provided.droppableProps}>
                                {savingsData.map((row, rowIndex) => (
                                    <Draggable
                                        key={row._id}
                                        draggableId={row._id.toString()}
                                        index={rowIndex}
                                    >
                                        {(provided) => (
                                            <tr
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                            >
                                                <BudgetRow
                                                    row={row}
                                                    type="saving"
                                                    onUpdateRow={handleUpdateRow}
                                                    dragHandleProps={provided.dragHandleProps}
                                                />
                                            </tr>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </tbody>
                        )}
                    </Droppable>
                    <SavingsFooter savingsData={savingsData} />

                    <ResultRow
                        incomeData={incomeData}
                        expensesData={expenseData}
                        savingsData={savingsData}
                    />
                </table>
            </DragDropContext>
        </div>
    );
};

export default FinancialTable;
