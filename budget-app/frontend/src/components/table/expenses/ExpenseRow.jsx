import { TABLE_MONTHS } from "@/constants";
import React from "react";

const ExpenseRow = ({ row }) => {
    const totalExpense = TABLE_MONTHS.reduce((sum, month) => {
        const monthKey = month.toLowerCase();
        return sum + (row[monthKey] || 0);
    }, 0);

    return (
        <tr>
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-600 text-white">
                {row.type}
            </td>
            {TABLE_MONTHS.map((month, index) => {
                const monthKey = month.toLowerCase();
                const value = row[monthKey] || 0;
                const formattedValue = new Intl.NumberFormat("sv-SE").format(value);
                return (
                    <td
                        key={index}
                        className={`px-4 py-2 border border-gray-300 ${
                            value > 0 ? "text-red-500" : "text-green-500"
                        }`}
                    >
                        {formattedValue}
                    </td>
                );
            })}
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-100">
                {new Intl.NumberFormat("sv-SE").format(totalExpense)} Kr
            </td>
        </tr>
    );
};

export default ExpenseRow;
