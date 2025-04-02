import { TEST_DATA_INCOME } from "@/testData";
import React from "react";
import IncomeHeader from "./income/IncomeHeader.jsx";
import IncomeRow from "./income/IncomeRow.jsx";

const FinancialTable = () => {
    return (
        <div className="overflow-x-auto py-6 px-10">
            <h1 className="text-2xl font-bold mb-4">Ekonomisk Översikt</h1>
            <table className="min-w-full table-auto border-collapse">
                <IncomeHeader />
                <tbody>
                    {TEST_DATA_INCOME.map((row, rowIndex) => (
                        <IncomeRow key={rowIndex} row={row} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default FinancialTable;
