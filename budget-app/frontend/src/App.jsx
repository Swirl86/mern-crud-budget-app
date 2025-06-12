import { DEFAULT_BUDGET, LOCAL_STORAGE_KEY } from "@/constants";
import budgetService from "@/services/api.js";
import BottomBar from "@components/BottomBar";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { BudgetProvider } from "@context/BudgetContext";
import { useCallback, useEffect, useState } from "react";
import Home from "./pages/Home";

const App = () => {
    const [budgets, setBudgets] = useState([]);
    const [selectedBudgetId, setSelectedBudgetId] = useState(null);

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const data = await budgetService.fetchAllBudgets();
                let sorted = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

                if (sorted.length === 0) {
                    const newBudget = await budgetService.createBudget(DEFAULT_BUDGET);
                    sorted = [newBudget];
                }

                setBudgets(sorted);

                const savedId = localStorage.getItem(LOCAL_STORAGE_KEY);
                const isValidSavedId = sorted.some((b) => b._id === savedId);

                if (isValidSavedId) {
                    setSelectedBudgetId(savedId);
                } else {
                    setSelectedBudgetId(sorted[0]._id);
                    localStorage.setItem(LOCAL_STORAGE_KEY, sorted[0]._id);
                }
            } catch (error) {
                console.error("Failed to fetch budgets", error);
            }
        };

        fetchBudgets();
    }, []);

    const handleSelectBudget = (budgetId) => {
        setSelectedBudgetId(budgetId);
        localStorage.setItem(LOCAL_STORAGE_KEY, budgetId);
    };

    const handleCreateBudget = async () => {
        try {
            const newBudget = await budgetService.createBudget(DEFAULT_BUDGET);
            setBudgets((prev) => [newBudget, ...prev]);
            setSelectedBudgetId(newBudget._id);
        } catch (error) {
            console.error("Failed to create budget", error);
        }
    };

    const handleDeleteBudget = useCallback(
        async (budgetIdToDelete) => {
            try {
                await budgetService.deleteBudget(budgetIdToDelete);
                const updated = budgets.filter((b) => b._id !== budgetIdToDelete);

                if (updated.length === 0) {
                    const newBudget = await budgetService.createBudget(DEFAULT_BUDGET);
                    setBudgets([newBudget]);
                    setSelectedBudgetId(newBudget._id);
                    localStorage.setItem(LOCAL_STORAGE_KEY, newBudget._id);
                } else {
                    setBudgets(updated);
                    if (budgetIdToDelete === selectedBudgetId) {
                        const newActive = updated[0]._id;
                        setSelectedBudgetId(newActive);
                        localStorage.setItem(LOCAL_STORAGE_KEY, newActive);
                    }
                }
            } catch (error) {
                console.error("Failed to delete budget", error);
            }
        },
        [budgets, selectedBudgetId]
    );

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <main className="flex-1 p-1 bg-gray-100">
                    <BudgetProvider budgetId={selectedBudgetId} onDeleteBudget={handleDeleteBudget}>
                        <Home />
                        <BottomBar
                            budgets={budgets}
                            selectedBudgetId={selectedBudgetId}
                            onSelectBudget={handleSelectBudget}
                            onCreateBudget={handleCreateBudget}
                        />
                    </BudgetProvider>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default App;
