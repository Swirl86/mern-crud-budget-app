import EditableTitle from "@components/table/EditableTitle";
import SavingIndicator from "@components/ui/SavingIndicator";
import { FaDownload, FaSave } from "react-icons/fa";

const OverviewHeader = ({
    title,
    onSaveTitle,
    onSave,
    isSaving,
    onDelete,
    isDeleting,
    onDownloadClick,
}) => {
    return (
        <div className="flex justify-between items-center mb-6 w-full">
            <div className="flex items-center gap-3 min-w-0 w-full">
                <div className="min-w-0 max-w-[40%]">
                    <EditableTitle initialTitle={title} onSaveTitle={onSaveTitle} />
                </div>

                <span title="Spara ändringar">
                    <FaSave
                        onClick={onSave}
                        className="ml-2 w-7 h-7 text-green-600 cursor-pointer hover:text-green-700 transition-colors"
                    />
                </span>
                {isSaving && <SavingIndicator />}
                <FaDownload
                    onClick={onDownloadClick}
                    className="ml-4 w-7 h-7 cursor-pointer text-blue-600 hover:text-blue-700 transition-colors"
                    title="Ladda ner din budget"
                />
            </div>
            <button
                onClick={onDelete}
                className="w-40 px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400 disabled:opacity-50"
                disabled={isDeleting}
            >
                Delete Budget
            </button>
        </div>
    );
};

export default OverviewHeader;
