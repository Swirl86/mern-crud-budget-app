import React, { useEffect, useState } from "react";
import FinancialTable from "../components/table/FinancialTable";

const Home = () => {
    const apiUrl = import.meta.env.VITE_BUDGET_API_BASE_URL;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="home">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && <FinancialTable budgetData={data} />}
        </div>
    );
};

export default Home;
