import SavingIndicator from "@components/SavingIndicator";
import { FaSave } from "react-icons/fa";

const OverviewHeader = ({ onSave, isSaving, onDelete, isDeleting }) => {
    return (
        <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3 min-w-0 overflow-hidden">
                <h1 className="text-3xl font-semibold text-gray-800">Ekonomisk Översikt</h1>
                <FaSave
                    onClick={onSave}
                    className="ml-2 w-7 h-7 text-green-600 cursor-pointer hover:text-green-700 transition-colors"
                />
                {isSaving && <SavingIndicator />}
            </div>
            <button
                onClick={onDelete}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                disabled={isDeleting}
            >
                Rensa Alla Data
            </button>
        </div>
    );
};

export default OverviewHeader;
