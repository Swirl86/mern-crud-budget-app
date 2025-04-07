import useBudgetData from "@hooks/useBudgetData";
import ErrorMessage from "@ui/ErrorMessage";
import LoadingIndicator from "@ui/LoadingIndicator";
import React from "react";
import FinancialTable from "../pages/table/FinancialTable";

const Home = () => {
    const { data, loading, error } = useBudgetData();

    return (
        <div className="home">
            {loading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && <FinancialTable budgetData={data} />}
        </div>
    );
};

export default Home;
