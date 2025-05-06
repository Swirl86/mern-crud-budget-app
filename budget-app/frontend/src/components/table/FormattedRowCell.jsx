import { formatSEK } from "@utils/format";
import { useState } from "react";

const FormattedRowCell = ({ value, textColor, editable = false, onValueChange = () => {} }) => {
    const formattedValue = formatSEK(value);
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value || "0");

    const handleClick = () => {
        if (editable) {
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        if (isEditing && inputValue !== value) {
            const numericValue = parseFloat(inputValue);
            if (!isNaN(numericValue)) {
                onValueChange(numericValue);
            }
        }
        setIsEditing(false);
    };

    const handleChange = (e) => {
        var newValue = e.target.value;
        if (newValue === "") {
            newValue = "0";
        }

        if (!isNaN(newValue) || newValue === "0") {
            setInputValue(newValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleBlur();
        }
        // Allow only numbers and the backspace key
        if (!/[\d]/.test(e.key) && e.key !== "Backspace") {
            e.preventDefault();
        }
    };

    return (
        <td
            className={`px-4 py-2 border border-gray-300 ${textColor} cursor-pointer leading-tight
                ${editable ? "hover:bg-gray-100 hover:border-blue-500" : "border-gray-300"} `}
            onClick={handleClick}
        >
            {isEditing ? (
                <input
                    type="number"
                    placeholder="input"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    onKeyDown={handleKeyPress}
                    className="w-full h-full border rounded bg-white text-black
                        [appearance:textfield]
                        [&::-webkit-outer-spin-button]:appearance-none
                        [&::-webkit-inner-spin-button]:appearance-none
                        focus:outline-none leading-tight"
                    min="0"
                />
            ) : (
                formattedValue || "Click to edit"
            )}
        </td>
    );
};

export default FormattedRowCell;
