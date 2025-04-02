import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import React from "react";

const IncomeHeader = () => {
    return (
        <thead>
            <tr>
                {/* Title */}
                <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">
                    {TABLE_TITLES.INCOME}
                </th>
                {/* Months */}
                {TABLE_MONTHS.map((month, index) => (
                    <th
                        key={`month-${index}`}
                        className="px-4 py-2 border border-gray-300 text-left bg-gray-100"
                    >
                        {month}
                    </th>
                ))}
                {/* Total */}
                <th className="px-4 py-2 border border-gray-300 text-left bg-gray-100">
                    {TABLE_TITLES.TOTAL}
                </th>
            </tr>
        </thead>
    );
};

export default IncomeHeader;
