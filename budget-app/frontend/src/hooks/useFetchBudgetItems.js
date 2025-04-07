import { fetchBudgetItems } from "@services/api";
import { useEffect, useState } from "react";

const useFetchBudgetItems = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const result = await fetchBudgetItems();
                setData(result);
            } catch (err) {
                setError(`Could not fetch budget data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return { data, loading, error, setData };
};

export default useFetchBudgetItems;
