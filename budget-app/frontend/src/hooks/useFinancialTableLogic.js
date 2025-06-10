import { ERROR_TYPES, LOADING_STATES } from "@/constants";
import { createDefaultBudgetItemWithType } from "@/utils/helpers";
import { useEffect, useState } from "react";

export const useFinancialTableLogic = (budget) => {
    const [editedRows, setEditedRows] = useState([]);
    const [activeDroppableId, setActiveDroppableId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

    const isClearingAllItems = budget.loadingState === LOADING_STATES.CLEARING_ALL_ITEMS;
    const isDeleting = budget.loadingState === LOADING_STATES.DELETING_ITEM;
    const isUpdating = budget.loadingState === LOADING_STATES.UPDATING_ITEM;
    const isAdding = budget.loadingState === LOADING_STATES.ADDING;
    const canShowDeleteModal = deleteId && !isSaving && !isDeleting;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                handleUpdateAllEdited();
            }
            if (e.key === "Enter") {
                e.preventDefault();
                handleUpdateAllEdited();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [editedRows]);

    useEffect(() => {
        const interval = setInterval(() => handleUpdateAllEdited(), 30000);
        return () => clearInterval(interval);
    }, [editedRows]);

    const handleUpdateRow = (updatedRow) => {
        setEditedRows((prev) => {
            const exists = prev.some((r) => r._id === updatedRow._id);
            return exists
                ? prev.map((r) => (r._id === updatedRow._id ? updatedRow : r))
                : [...prev, updatedRow];
        });
    };

    const handleUpdateAllEdited = async () => {
        if (isSaving || isUpdating) return;
        try {
            setIsSaving(true);
            for (const row of editedRows) {
                await budget.updateItem(row);
            }
            setEditedRows([]);
        } catch (error) {
            budget.setError({ type: ERROR_TYPES.UPDATE_ERROR, message: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddRow = async (type, sectionData) => {
        if (isSaving || isAdding) return;
        try {
            setIsSaving(true);
            const lastOrder = sectionData[type]?.length || 0;
            const newItem = createDefaultBudgetItemWithType(type, lastOrder);
            await budget.addItem(newItem);
        } catch (error) {
            budget.setError({ type: ERROR_TYPES.ADD_ERROR, message: error.message });
        } finally {
            setIsSaving(false);
        }
    };

    const openDeleteConfirm = (id) => setDeleteId(id);

    const closeDeleteConfirm = () => setDeleteId(null);

    const confirmDelete = async () => {
        try {
            setIsSaving(true);
            await budget.deleteItemById(deleteId);
        } catch (error) {
            budget.setError({ type: ERROR_TYPES.DELETE_ITEM_ERROR, message: error.message });
        } finally {
            setIsSaving(false);
            closeDeleteConfirm();
        }
    };

    const openDeleteAllConfirm = () => setShowDeleteAllModal(true);

    const closeDeleteAllConfirm = () => setShowDeleteAllModal(false);

    const confirmDeleteAll = async () => {
        try {
            setIsSaving(true);
            await budget.deleteEntireBudget();
        } catch (error) {
            budget.setError({
                type: ERROR_TYPES.CLEAR_ALL_ITEMS_ERROR,
                message: error.message,
            });
        } finally {
            setIsSaving(false);
            closeDeleteAllConfirm();
        }
    };

    const handleDragStart = (start) => setActiveDroppableId(start.source.droppableId);

    const handleDragEnd = async ({ source, destination }, sectionData) => {
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

    return {
        editedRows,
        isSaving,
        openDeleteConfirm,
        closeDeleteConfirm,
        activeDroppableId,
        isClearingAllItems,
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
    };
};
