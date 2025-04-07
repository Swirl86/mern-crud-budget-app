import useBudgetData from "@/hooks/useBudgetData";
import React from "react";
import FinancialTable from "../pages/table/FinancialTable";

const Home = () => {
    const { data, loading, error } = useBudgetData();

    return (
        <div className="home">
            {loading && <p>Laddar...</p>}
            {error && <p className="text-red-500">Fel: {error}</p>}
            {!loading && !error && <FinancialTable budgetData={data} />}
        </div>
    );
};

export default Home;
