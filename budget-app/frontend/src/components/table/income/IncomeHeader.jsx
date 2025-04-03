import { TABLE_TITLES } from "@/constants";
import React from "react";
import MonthRow from "../seperator/MonthRow.jsx";
import TitleHeader from "../seperator/TitleHeader.jsx";

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
