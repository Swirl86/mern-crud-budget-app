import { TABLE_TITLES } from "@/constants";
import RowFooter from "@table/RowFooter";

const IncomeFooter = ({ incomeData }) => {
    return (
        <RowFooter
            title={TABLE_TITLES.TOTAL_INCOME}
            data={incomeData}
            positiveColor="text-green-500"
        />
    );
};

export default IncomeFooter;
