import { TABLE_TITLES } from "@/constants";
import MonthRow from "@table/MonthRow";
import TitleHeader from "@table/TitleHeader";
import React from "react";

const IncomeHeader = () => {
    return (
        <thead>
            <tr>
                <TitleHeader title={TABLE_TITLES.INCOMES} />
                <MonthRow />
                <TitleHeader title={TABLE_TITLES.TOTAL} />
            </tr>
        </thead>
    );
};

export default IncomeHeader;
