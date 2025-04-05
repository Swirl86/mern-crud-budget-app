import FormattedRowCell from "@table/FormattedRowCell";
import FormattedSumCell from "@table/FormattedSumCell";
import React from "react";

const IncomeRow = ({ row }) => {
    return (
        <tr>
            {/* Income category cell */}
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-600 text-white">
                {row.category}
            </td>
            {/* Monthly data cells */}
            {Object.entries(row.amounts).map(([_, value], colIndex) => (
                <FormattedRowCell key={colIndex} value={value} textColor={"text-green-500"} />
            ))}
            {/* Total-cell - Calculated and added at the end */}
            <FormattedSumCell amounts={row.amounts} />
        </tr>
    );
};

export default IncomeRow;
