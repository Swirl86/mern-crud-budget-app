import { updateBudgetOrder } from "@services/api";
import { useState } from "react";

export const useUpdateBudgetOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateItemOrder = async (type, newOrderedItems) => {
        try {
            setLoading(true);
            await updateBudgetOrder(type, newOrderedItems);
        } catch (err) {
            setError(`Could not update order: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    return { updateItemOrder, loading, error };
};

export default useUpdateBudgetOrder;
