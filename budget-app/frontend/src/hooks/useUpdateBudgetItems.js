import { updateBudgetItem } from "@services/api";
import { useState } from "react";

const useUpdateBudgetItems = () => {
    const [isUpdating, setIsUpdating] = useState(false);
    const [error, setError] = useState(null);

    const updateItem = async (budgetItem) => {
        setIsUpdating(true);
        setError(null);

        try {
            const result = await updateBudgetItem(budgetItem);
            console.log("Updated item:", result);
            return result;
        } catch (err) {
            setError(`Failed to update: ${err.message}`);
        } finally {
            setIsUpdating(false);
        }
    };

    return { updateItem, isUpdating, error };
};

export default useUpdateBudgetItems;
