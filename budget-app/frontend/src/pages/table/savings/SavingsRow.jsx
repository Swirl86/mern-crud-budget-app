import FormattedRowCell from "@table/FormattedRowCell";
import FormattedSumCell from "@table/FormattedSumCell";
import React from "react";

const SavingsRow = ({ row }) => {
    return (
        <tr>
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-blue-600 text-white">
                {row.category}
            </td>
            {Object.entries(row.amounts).map(([_, value], colIndex) => (
                <FormattedRowCell key={colIndex} value={value} textColor={"text-blue-500"} />
            ))}
            <FormattedSumCell amounts={row.amounts} />
        </tr>
    );
};

export default SavingsRow;
