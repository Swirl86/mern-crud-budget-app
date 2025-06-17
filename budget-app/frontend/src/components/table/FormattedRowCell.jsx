import { formatSEK } from "@utils/format";
import clsx from "clsx";
import { useState } from "react";
import { FaCopy } from "react-icons/fa";

const FormattedRowCell = ({
    value,
    textColor,
    editable = false,
    onValueChange = () => {},
    onCopyToAll = null,
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value || "0");
    const [isHovered, setIsHovered] = useState(false);

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
        let newValue = e.target.value;
        if (/^\d*\.?\d*$/.test(newValue)) {
            newValue = newValue.replace(/^0+(?=\d)/, "");
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
                "px-4 py-2 border border-gray-300 leading-tight w-[120px] min-w-0 relative",
                textColor,
                editable && "cursor-pointer hover:bg-gray-100 hover:border-blue-500"
            )}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isEditing ? (
                <input
                    type="number"
                    placeholder="amount"
                    value={inputValue}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    autoFocus
                    onKeyDown={handleKeyPress}
                    className="w-full h-full border rounded bg-white text-black focus:outline-none leading-tight"
                    min="0"
                />
            ) : (
                <>
                    <span>{value ? formatSEK(value) : "0"}</span>

                    {onCopyToAll && isHovered && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onCopyToAll(value);
                            }}
                            className="absolute top-1 right-1 text-blue-500 hover:text-blue-700"
                            title="Kopiera värde till alla månader"
                        >
                            <FaCopy size={14} />
                        </button>
                    )}
                </>
            )}
        </td>
    );
};

export default FormattedRowCell;
