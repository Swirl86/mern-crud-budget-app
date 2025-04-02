import { TABLE_MONTHS } from "@/constants";
import React from "react";

const IncomeRow = ({ row }) => {
    return (
        <tr>
            {/* Income type cell */}
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-600 text-white">
                {row.type}
            </td>
            {/* Monthly data cells */}
            {TABLE_MONTHS.map((month, colIndex) => {
                const monthKey = month.toLowerCase();
                const value = row[monthKey] !== undefined ? row[monthKey] : 0;
                const formattedValue = new Intl.NumberFormat("sv-SE").format(value);
                return (
                    <td
                        key={colIndex}
                        className={`px-4 py-2 border border-gray-300 ${
                            value < 0 ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        {formattedValue}
                    </td>
                );
            })}
            {/* Total-cell - Calculated and added at the end */}
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-100">
                {new Intl.NumberFormat("sv-SE").format(
                    TABLE_MONTHS.reduce((sum, month) => {
                        const monthKey = month.toLowerCase();
                        return sum + (row[monthKey] || 0);
                    }, 0)
                )}{" "}
                Kr
            </td>
        </tr>
    );
};

export default IncomeRow;
