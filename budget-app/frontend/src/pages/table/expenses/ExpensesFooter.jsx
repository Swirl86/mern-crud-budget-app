import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import React from "react";

const ExpensesFooter = ({ expensesData }) => {
    const monthlySums = TABLE_MONTHS.reduce((acc, month) => {
        acc[month.toLowerCase()] = 0;
        return acc;
    }, {});

    expensesData.forEach((expense) => {
        Object.entries(expense.amounts).forEach(([month, value]) => {
            const monthKey = month.toLowerCase();
            if (monthlySums[monthKey] !== undefined) {
                monthlySums[monthKey] += value;
            }
        });
    });

    const totalExpenses = Object.values(monthlySums).reduce((sum, value) => sum + value, 0);

    return (
        <thead className="bg-gray-200 font-bold">
            <tr>
                <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-400">
                    {TABLE_TITLES.TOTAL_EXPENSES}
                </td>
                {TABLE_MONTHS.map((month, index) => {
                    const monthKey = month.toLowerCase();
                    const value = monthlySums[monthKey];
                    const formattedValue = new Intl.NumberFormat("sv-SE").format(value);
                    return (
                        <td
                            key={index}
                            className={`px-4 py-2 border border-gray-300 ${
                                value == 0 ? "text-gray-500" : "text-red-500"
                            }`}
                        >
                            {formattedValue}
                        </td>
                    );
                })}
                <td className="px-4 py-2 border border-gray-300 font-semibold">
                    {new Intl.NumberFormat("sv-SE").format(totalExpenses)} Kr
                </td>
            </tr>
        </thead>
    );
};

export default ExpensesFooter;
