import { deleteAllBudgetItems } from "@services/api";
import { useState } from "react";

export const useDeleteAllBudgetItems = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteAll = async () => {
        try {
            setLoading(true);
            await deleteAllBudgetItems();
        } catch (err) {
            setError(`Could not delete all items: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return { deleteAll, loading, error };
};

export default useDeleteAllBudgetItems;
