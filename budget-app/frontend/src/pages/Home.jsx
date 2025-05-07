import { useDeleteAllBudgetItems, useFetchBudgetItems } from "@hooks";
import ErrorMessage from "@ui/ErrorMessage";
import LoadingIndicator from "@ui/LoadingIndicator";
import React from "react";
import FinancialTable from "../pages/table/FinancialTable";

const Home = () => {
    const { data, loading, error, setData } = useFetchBudgetItems();
    const {
        deleteAll,
        loading: deleteAllLoading,
        error: deleteAllError,
    } = useDeleteAllBudgetItems();

    const handleDeleteAll = async () => {
        try {
            await deleteAll(); // Trigger deleteAll from the custom hook
            setData([]); // Clear the local state after deletion
        } catch (err) {
            console.error("Error during delete all:", err);
        }
    };

    return (
        <div className="home bg-gray-200 min-h-screen py-6">
            {loading && <LoadingIndicator />}
            {error && <ErrorMessage message={error} />}
            {!loading && !error && (
                <FinancialTable
                    budgetData={data}
                    onDeleteAll={handleDeleteAll}
                    deleteAllLoading={deleteAllLoading}
                    deleteAllError={deleteAllError}
                />
            )}
        </div>
    );
};

export default Home;
