import { BudgetTypes } from "@/constants";
import FormattedRowCell from "@table/FormattedRowCell";
import FormattedSumCell from "@table/FormattedSumCell";
import { useState } from "react";

const BudgetRow = ({ row, type, onUpdateRow }) => {
    const [isEditingCategory, setIsEditingCategory] = useState(false);
    const [editedCategory, setEditedCategory] = useState(row.category);
    const [editedAmounts, setEditedAmounts] = useState(row.amounts);

    const handleCategoryClick = () => {
        setIsEditingCategory(true);
    };

    const handleCategoryChange = (e) => {
        setEditedCategory(e.target.value);
    };

    const handleSaveCategory = () => {
        if (editedCategory.trim() !== "") {
            onUpdateRow({ ...row, category: editedCategory, amounts: editedAmounts });
        }
        setIsEditingCategory(false);
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
        <tr>
            <td
                className={`
                    px-4 py-2 border border-gray-300 font-semibold cursor-pointer leading-tight
                    ${
                        isEditingCategory
                            ? "bg-gray-600 text-black "
                            : "bg-gray-500 text-white hover:bg-gray-700 hover:border-blue-500 hover:shadow-md"
                    }
                `}
                onClick={handleCategoryClick}
            >
                {isEditingCategory ? (
                    <input
                        type="text"
                        placeholder="input"
                        value={editedCategory}
                        onChange={handleCategoryChange}
                        onBlur={handleSaveCategory} // Trigger save when focus is lost
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSaveCategory();
                        }} // Trigger save when Enter is pressed
                        autoFocus
                        className="w-full h-full border rounded bg-white text-black
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        focus:outline-none leading-tight"
                    />
                ) : (
                    <span onClick={handleCategoryClick}> {editedCategory || "Click to edit"} </span>
                )}
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
        </tr>
    );
};

export default BudgetRow;
