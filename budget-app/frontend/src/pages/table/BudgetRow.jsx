import { BudgetTypes } from "@/constants";
import FormattedRowCell from "@table/FormattedRowCell";
import FormattedSumCell from "@table/FormattedSumCell";
import { useRef, useState } from "react";
import { FaGripVertical } from "react-icons/fa";

const BudgetRow = ({ row, type, onUpdateRow, dragHandleProps }) => {
    const inputRef = useRef(null);

    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [editedCategory, setEditedCategory] = useState(row.category);
    const [editedAmounts, setEditedAmounts] = useState(row.amounts);

    const handleCategoryChange = (e) => {
        setEditedCategory(e.target.value);
    };

    const handleSaveCategory = () => {
        if (editedCategory.trim() !== "") {
            onUpdateRow({ ...row, category: editedCategory, amounts: editedAmounts });
        }
        setIsEditingCategory(false);
        inputRef.current?.blur();
    };

    const handleAmountChange = (month, newValue) => {
        setEditedAmounts((prevAmounts) => {
            const newAmounts = { ...prevAmounts };
            newAmounts[month] = newValue;
            onUpdateRow({ ...row, amounts: newAmounts });
            return newAmounts;
        });
    };

    const textColor =
        type === BudgetTypes.INCOME
            ? "text-green-500"
            : type === BudgetTypes.EXPENSE
            ? "text-red-500"
            : type === BudgetTypes.SAVING
            ? "text-blue-500"
            : "text-gray-500";

    return (
        <>
            <td
                className={`
                            px-4 py-2 border border-gray-300 font-semibold leading-tight
                            ${
                                isEditingCategory
                                    ? "bg-gray-600 text-black"
                                    : "bg-gray-500 text-white hover:bg-gray-700 hover:border-blue-500 hover:shadow-md"
                            }
                        `}
            >
                <div className="flex items-center space-x-2">
                    <div
                        {...dragHandleProps}
                        className="cursor-grab text-2xl text-white hover:text-blue-400"
                        title="Dra för att flytta"
                        aria-label="Flytta rad"
                    >
                        <FaGripVertical />
                    </div>

                    <input
                        type="text"
                        placeholder="Kategori"
                        ref={inputRef}
                        value={editedCategory}
                        readOnly={!isEditingCategory}
                        onClick={() => setIsEditingCategory(true)}
                        onChange={handleCategoryChange}
                        onBlur={handleSaveCategory}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveCategory();
                        }}
                        autoFocus={isEditingCategory}
                        className={`
                                    w-full rounded leading-tight transition-colors duration-150
                                    ${
                                        isEditingCategory
                                            ? "bg-white text-black border border-blue-400 focus:border-blue-500 focus:outline-none"
                                            : "bg-transparent text-white border border-transparent cursor-pointer hover:text-blue-400"
                                    }
                                `}
                    />
                </div>
            </td>

            {Object.entries(editedAmounts).map(([month, value], colIndex) => (
                <FormattedRowCell
                    key={colIndex}
                    value={value}
                    textColor={textColor}
                    editable={true}
                    onValueChange={(newValue) => handleAmountChange(month, newValue)}
                />
            ))}

            <FormattedSumCell amounts={editedAmounts} />
        </>
    );
};

export default BudgetRow;
