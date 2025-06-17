import { FaFileCsv, FaFileExcel, FaFilePdf, FaTimes } from "react-icons/fa";

const DownloadDialog = ({ onClose, onExportCSV, onExportPDF, onExportExcel }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-xs w-full p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-semibold text-gray-900">Export Budget</h2>
                    <button
                        onClick={onClose}
                        aria-label="Close dialog"
                        className="text-gray-500 hover:text-gray-800 transition"
                    >
                        <FaTimes className="w-6 h-6" />
                    </button>
                </div>

                <p className="mb-6 text-gray-600 text-sm">Ladda ner din budget i önskat format.</p>

                <div className="flex flex-col space-y-4">
                    <button
                        onClick={onExportCSV}
                        className="flex items-center space-x-3 justify-center px-5 py-3 rounded-lg bg-green-600 text-white font-medium shadow-md hover:bg-green-700 transition"
                    >
                        <FaFileCsv className="w-5 h-5" />
                        <span>CSV</span>
                    </button>

                    <button
                        onClick={onExportPDF}
                        className="flex items-center space-x-3 justify-center px-5 py-3 rounded-lg bg-red-600 text-white font-medium shadow-md hover:bg-red-700 transition"
                    >
                        <FaFilePdf className="w-5 h-5" />
                        <span>PDF</span>
                    </button>

                    <button
                        onClick={onExportExcel}
                        className="flex items-center space-x-3 justify-center px-5 py-3 rounded-lg bg-blue-600 text-white font-medium shadow-md hover:bg-blue-700 transition"
                    >
                        <FaFileExcel className="w-5 h-5" />
                        <span>Excel</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DownloadDialog;
