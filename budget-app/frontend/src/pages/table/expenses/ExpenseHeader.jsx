import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import TitleHeader from "@table/TitleHeader";
import React from "react";

const ExpenseHeader = () => {
    return (
        <thead>
            <tr>
                <TitleHeader title={TABLE_TITLES.EXPENSES} />
                <th
                    className="px-4 py-2 border border-gray-300 text-left bg-gray-100"
                    colSpan={TABLE_MONTHS.length + 1}
                >
                    {}
                </th>
            </tr>
        </thead>
    );
};

export default ExpenseHeader;
