import { deleteBudgetItem } from "@services/api";
import { useState } from "react";

export const useDeleteBudgetItem = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteItem = async (id) => {
        try {
            setLoading(true);
            await deleteBudgetItem(id);
        } catch (err) {
            setError(`Could not delete the item: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { deleteItem, loading, error };
};

export default useDeleteBudgetItem;
