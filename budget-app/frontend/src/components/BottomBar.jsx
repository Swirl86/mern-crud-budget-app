import { useState } from "react";
import { FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";

const BottomBar = ({ budgets, selectedBudgetId, onSelectBudget, onCreateBudget }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-blue-100 to-blue-50 shadow-t z-50 border-t transition-all duration-300 ${
                isExpanded ? "h-20" : "h-12"
            }`}
        >
            <div className="flex h-full items-center px-4">
                <div
                    className="flex-1 overflow-x-auto flex items-center space-x-2 pr-2
                    scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100 scroll-smooth pb-2"
                >
                    {isExpanded && (
                        <button
                            className="min-w-[120px] max-w-[120px] px-3 py-2 bg-green-600 text-white text-sm font-medium rounded shadow flex items-center justify-center hover:bg-green-700 transition"
                            title="Create an empty budget"
                            onClick={onCreateBudget}
                        >
                            <FaPlus className="mr-1" /> Ny
                        </button>
                    )}

                    {isExpanded &&
                        budgets.map((budget) => {
                            const isSelected = budget._id === selectedBudgetId;
                            return (
                                <div
                                    key={budget._id}
                                    className={`min-w-[120px] max-w-[120px] px-3 py-2 text-sm font-medium rounded shadow truncate whitespace-nowrap cursor-pointer transition
                    ${
                        isSelected
                            ? "bg-blue-800 text-white"
                            : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                                    title={budget.title}
                                    onClick={() => onSelectBudget(budget._id)}
                                >
                                    {budget.title}
                                </div>
                            );
                        })}
                </div>

                <button
                    onClick={toggleExpanded}
                    title="My budgets"
                    className="ml-2 p-2 bg-white rounded-full shadow-md border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-800 transition"
                    aria-label={isExpanded ? "Minimize budget bar" : "Expand budget bar"}
                >
                    {isExpanded ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />}
                </button>
            </div>
        </div>
    );
};

export default BottomBar;
