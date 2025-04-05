import { TABLE_MONTHS } from "@/constants";
import { formatSEK } from "@/utils/format";
import React from "react";

const RowFooter = ({ title, data, positiveColor }) => {
    const monthlySums = TABLE_MONTHS.reduce((acc, month) => {
        acc[month.toLowerCase()] = 0;
        return acc;
    }, {});

    data.forEach((item) => {
        Object.entries(item.amounts).forEach(([month, value]) => {
            const monthKey = month.toLowerCase();
            if (monthlySums[monthKey] !== undefined) {
                monthlySums[monthKey] += value;
            }
        });
    });

    const totalSum = Object.values(monthlySums).reduce((sum, value) => sum + value, 0);

    return (
        <thead className="bg-gray-200 font-bold">
            <tr>
                <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-400">
                    {title}
                </td>
                {TABLE_MONTHS.map((month, index) => {
                    const monthKey = month.toLowerCase();
                    const value = monthlySums[monthKey];
                    const formattedValue = formatSEK(value);
                    return (
                        <td
                            key={index}
                            className={`px-4 py-2 border border-gray-300 ${
                                value === 0 ? "text-gray-500" : positiveColor
                            }`}
                        >
                            {formattedValue}
                        </td>
                    );
                })}
                <td className="px-4 py-2 border border-gray-300 font-semibold">
                    {formatSEK(totalSum)} Kr
                </td>
            </tr>
        </thead>
    );
};

export default RowFooter;
