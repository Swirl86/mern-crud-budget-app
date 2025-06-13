import { useBudgets } from "@context/BudgetsContext";
import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";

const BottomBar = () => {
    const { budgets, selectedBudgetId, selectBudget, createBudget } = useBudgets();
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-blue-50 via-blue-100 to-blue-50 shadow-lg z-50 border-t border-blue-200 transition-all duration-300 ${
                isExpanded ? "h-24" : "h-14"
            } backdrop-blur-sm`}
        >
            <div className="flex h-full items-center px-5">
                <div
                    className="flex-1 overflow-x-auto flex items-center space-x-3 pr-3
                 scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-100 scroll-smooth pb-2"
                >
                    {isExpanded && (
                        <button
                            className="min-w-[130px] px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg shadow-md flex items-center justify-center hover:bg-green-700 transition whitespace-nowrap"
                            title="Create an empty budget"
                            onClick={createBudget}
                        >
                            <FaPlus className="mr-2" /> Ny Budget
                        </button>
                    )}

                    {isExpanded &&
                        budgets.map((budget) => {
                            const isSelected = budget._id === selectedBudgetId;
                            return (
                                <div
                                    key={budget._id}
                                    className={`min-w-[130px] max-w-[130px] px-4 py-2 text-sm font-semibold rounded-lg shadow cursor-pointer truncate whitespace-nowrap transition
                                        ${
                                            isSelected
                                                ? "bg-blue-900 text-white ring-2 ring-white border border-blue-900 shadow-lg"
                                                : "bg-blue-600 text-white hover:bg-blue-700"
                                        }`}
                                    title={budget.title}
                                    onClick={() => selectBudget(budget._id)}
                                >
                                    {budget.title}
                                </div>
                            );
                        })}
                </div>

                <button
                    onClick={toggleExpanded}
                    title="Toggle budget bar"
                    className="ml-3 p-2 bg-white rounded-full shadow-md border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition flex items-center justify-center"
                    aria-label={isExpanded ? "Minimize budget bar" : "Expand budget bar"}
                >
                    {isExpanded ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
                </button>
            </div>
        </div>
    );
};

export default BottomBar;
