import FormattedRowCell from "@table/FormattedRowCell";
import FormattedSumCell from "@table/FormattedSumCell";
import React from "react";

const ExpenseRow = ({ row }) => {
    return (
        <tr>
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-600 text-white">
                {row.category}
            </td>
            {Object.entries(row.amounts).map(([_, value], colIndex) => (
                <FormattedRowCell key={colIndex} value={value} textColor={"text-red-500"} />
            ))}
            <FormattedSumCell amounts={row.amounts} />
        </tr>
    );
};

export default ExpenseRow;
