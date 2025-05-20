import { TABLE_TITLES } from "@/constants";
import MonthRow from "@table/MonthRow";
import TitleHeader from "@table/TitleHeader";

const IncomeHeader = ({ onAdd = () => {} }) => {
    return (
        <thead>
            <tr>
                <TitleHeader title={TABLE_TITLES.INCOMES} type="income" onAdd={onAdd} />
                <MonthRow />
                <TitleHeader title={TABLE_TITLES.TOTAL} />
            </tr>
        </thead>
    );
};

export default IncomeHeader;
