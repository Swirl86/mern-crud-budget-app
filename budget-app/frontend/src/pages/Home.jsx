import { useBudget } from "@context/BudgetContext";
import ErrorMessage from "@ui/ErrorMessage";
import LoadingIndicator from "@ui/LoadingIndicator";
import React from "react";
import FinancialTable from "../pages/table/FinancialTable";

const Home = () => {
    const { isLoading, error } = useBudget();

    return (
        <div className="home bg-gray-200 min-h-screen py-6">
            {isLoading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && <FinancialTable />}
        </div>
    );
};

export default Home;
