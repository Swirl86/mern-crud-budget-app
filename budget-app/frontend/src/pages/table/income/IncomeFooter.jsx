import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import React from "react";

const IncomeFooter = ({ incomeData }) => {
    const monthlySums = TABLE_MONTHS.reduce((acc, month) => {
        acc[month.toLowerCase()] = 0;
        return acc;
    }, {});

    incomeData.forEach((income) => {
        Object.entries(income.amounts).forEach(([month, value]) => {
            const monthKey = month.toLowerCase();
            if (monthlySums[monthKey] !== undefined) {
                monthlySums[monthKey] += value;
            }
        });
    });

    const totalIncome = Object.values(monthlySums).reduce((sum, value) => sum + value, 0);

    return (
        <thead className="bg-gray-200 font-bold">
            <tr>
                {/* Total income title */}
                <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-400">
                    {TABLE_TITLES.TOTAL_INCOME}
                </td>
                {/* Each months total */}
                {TABLE_MONTHS.map((month, index) => {
                    const monthKey = month.toLowerCase();
                    const value = monthlySums[monthKey];
                    const formattedValue = new Intl.NumberFormat("sv-SE").format(value);
                    return (
                        <td
                            key={index}
                            className={`px-4 py-2 border border-gray-300 ${
                                value == 0 ? "text-gray-500" : "text-green-500"
                            }`}
                        >
                            {formattedValue}
                        </td>
                    );
                })}
                {/* Annual income */}
                <td className="px-4 py-2 border border-gray-300 font-semibold">
                    {new Intl.NumberFormat("sv-SE").format(totalIncome)} Kr
                </td>
            </tr>
        </thead>
    );
};

export default IncomeFooter;
