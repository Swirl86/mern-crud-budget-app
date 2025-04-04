import React from "react";

const IncomeRow = ({ row }) => {
    return (
        <tr>
            {/* Income category cell */}
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-600 text-white">
                {row.category}
            </td>
            {/* Monthly data cells */}
            {Object.entries(row.amounts).map(([month, value], colIndex) => {
                const formattedValue = new Intl.NumberFormat("sv-SE").format(value);
                return (
                    <td
                        key={colIndex}
                        className={`px-4 py-2 border border-gray-300 ${
                            value == 0 ? "text-gray-500" : "text-green-500"
                        }`}
                    >
                        {formattedValue}
                    </td>
                );
            })}
            {/* Total-cell - Calculated and added at the end */}
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-100">
                {new Intl.NumberFormat("sv-SE").format(
                    Object.values(row.amounts).reduce((sum, amount) => sum + amount, 0)
                )}{" "}
                Kr
            </td>
        </tr>
    );
};

export default IncomeRow;
