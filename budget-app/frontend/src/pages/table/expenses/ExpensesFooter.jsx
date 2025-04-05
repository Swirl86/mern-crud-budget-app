import { TABLE_TITLES } from "@/constants";
import RowFooter from "@table/RowFooter";
import React from "react";

const ExpensesFooter = ({ expensesData }) => {
    return (
        <RowFooter
            title={TABLE_TITLES.TOTAL_EXPENSES}
            data={expensesData}
            positiveColor="text-red-500"
        />
    );
};

export default ExpensesFooter;
