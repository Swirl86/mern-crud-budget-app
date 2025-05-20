import { FaPlus } from "react-icons/fa";

const TitleHeader = ({ title = "", type = "", onAdd = () => {} }) => {
    return (
        <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">
            <div className="flex items-center justify-between">
                <span>{title}</span>
                {type && onAdd && (
                    <button
                        onClick={() => onAdd(type)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        title="Lägg till ny rad"
                    >
                        <FaPlus />
                    </button>
                )}
            </div>
        </th>
    );
};

export default TitleHeader;
