import { useEffect, useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";

const DeleteConfirmModal = ({ onConfirm, onCancel }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
    }, []);

    const handleCancel = () => {
        setShow(false);
        setTimeout(() => {
            onCancel();
        }, 300);
    };

    return (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity duration-300 ${
                show ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
            <div
                className={`bg-white rounded-lg p-6 max-w-sm w-full shadow-xl transform transition-transform duration-300 ${
                    show ? "translate-y-0" : "-translate-y-4"
                } flex flex-col items-center text-center`}
            >
                <h3 className="flex items-center text-lg font-semibold mb-4 text-red-600 justify-center">
                    Bekräfta borttagning
                    <FaExclamationTriangle className="ml-2 text-red-600" size={24} />
                </h3>
                <p className="mb-6 text-gray-700">
                    Är du säker på att du vill ta bort raden? Det går inte att ångra.
                </p>
                <div className="flex justify-center space-x-6 w-full max-w-xs">
                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                        Ja, ta bort
                    </button>
                    <button
                        onClick={handleCancel}
                        className="px-6 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Nej, avbryt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
