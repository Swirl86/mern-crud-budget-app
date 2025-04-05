import { TABLE_TITLES } from "@/constants";
import RowFooter from "@table/RowFooter";
import React from "react";

const SavingsFooter = ({ savingsData }) => {
    return (
        <RowFooter
            title={TABLE_TITLES.TOTAL_SAVINGS}
            data={savingsData}
            positiveColor="text-blue-500"
        />
    );
};

export default SavingsFooter;
