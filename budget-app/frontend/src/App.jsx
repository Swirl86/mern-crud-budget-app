import BottomBar from "@components/BottomBar";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { BudgetProvider } from "@context/BudgetContext";
import { BudgetsProvider, useBudgets } from "@context/BudgetsContext";
import Home from "./pages/Home";

const MainContent = () => {
    const { selectedBudgetId, deleteBudget } = useBudgets();

    return (
        <BudgetProvider budgetId={selectedBudgetId} onDeleteBudget={deleteBudget}>
            <Home />
            <BottomBar />
        </BudgetProvider>
    );
};

const App = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex flex-1">
                <main className="flex-1 p-1 bg-gray-100">
                    <BudgetsProvider>
                        <MainContent />
                    </BudgetsProvider>
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default App;
