import { formatSEK } from "@utils/format";
import clsx from "clsx";
import { useState } from "react";

const FormattedRowCell = ({ value, textColor, editable = false, onValueChange = () => {} }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value || "0");

    const handleClick = () => {
        if (editable) {
            setIsEditing(true);
        }
    };

    const handleBlur = () => {
        const numericValue = parseFloat(inputValue);
        if (!isNaN(numericValue) && numericValue !== value) {
            onValueChange(numericValue);
        }
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const newValue = e.target.value.replace(",", ".");
        if (/^\d*\.?\d*$/.test(newValue)) {
            setInputValue(newValue);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleBlur();
        } else if (
            !/[\d]/.test(e.key) &&
            e.key !== "Backspace" &&
            e.key !== "ArrowLeft" &&
            e.key !== "ArrowRight"
        ) {
            e.preventDefault();
        }
    };

    return (
        <td
            className={clsx(
                "px-4 py-2 border border-gray-300 leading-tight w-[120px] min-w-0",
                textColor,
                editable && "cursor-pointer hover:bg-gray-100 hover:border-blue-500"
            )}
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
                    className="w-full h-full border rounded bg-white text-black focus:outline-none leading-tight"
                    min="0"
                />
            ) : (
                <span>{value ? formatSEK(value) : "0"}</span>
            )}
        </td>
    );
};

export default FormattedRowCell;
