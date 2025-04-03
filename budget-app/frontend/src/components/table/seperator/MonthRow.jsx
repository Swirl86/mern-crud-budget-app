import { TABLE_MONTHS } from "@/constants";
import React from "react";

const MonthRow = () => {
    return (
        <>
            {TABLE_MONTHS.map((month, index) => (
                <th
                    key={month + "-" + index}
                    className="px-4 py-2 border border-gray-300 text-left bg-gray-100"
                >
                    {month}
                </th>
            ))}
        </>
    );
};

export default MonthRow;
