import { getTextColorByType } from "@/utils/helpers";
import FormattedRowCell from "@table/FormattedRowCell";
import FormattedSumCell from "@table/FormattedSumCell";
import clsx from "clsx";
import { useRef, useState } from "react";
import { FaGripVertical } from "react-icons/fa";

const BudgetRow = ({ row, type, onUpdateRow, dragHandleProps, isDragging }) => {
    const inputRef = useRef(null);

    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [editedCategory, setEditedCategory] = useState(row.category);
    const [editedAmounts, setEditedAmounts] = useState(row.amounts);

    const textColor = getTextColorByType(type);

    const handleCategoryChange = (e) => setEditedCategory(e.target.value);

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

    const categoryCellClasses = clsx(
        "px-4 py-2 border border-gray-300 font-semibold leading-tight w-[250px] min-w-0",
        isDragging
            ? "bg-gray-300 text-black"
            : isEditingCategory
            ? "bg-gray-600 text-black"
            : "bg-gray-500 text-white hover:bg-gray-700 hover:border-blue-500 hover:shadow-md"
    );

    const inputClasses = clsx(
        "flex-1 min-w-0 rounded leading-tight transition-colors duration-150",
        isEditingCategory
            ? "bg-white text-black border border-blue-400 focus:border-blue-500 focus:outline-none px-2 py-1"
            : "bg-transparent text-white border border-transparent cursor-pointer hover:text-blue-400"
    );

    return (
        <>
            <td className={categoryCellClasses}>
                <div className="flex items-center space-x-2 min-w-0 overflow-hidden">
                    <div
                        {...dragHandleProps}
                        className="cursor-grab text-2xl text-white hover:text-blue-400 shrink-0"
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
                        className={inputClasses}
                    />
                </div>
            </td>

            {Object.entries(editedAmounts).map(([month, value]) => (
                <FormattedRowCell
                    key={month}
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
