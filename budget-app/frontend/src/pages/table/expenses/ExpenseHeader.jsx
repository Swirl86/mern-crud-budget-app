import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import TitleHeader from "@table/TitleHeader";

const ExpenseHeader = ({ onAdd = () => {} }) => {
    return (
        <thead>
            <tr>
                <TitleHeader title={TABLE_TITLES.EXPENSES} type="expense" onAdd={onAdd} />
                <th
                    className="px-4 py-2 border border-gray-300 text-left bg-gray-100"
                    colSpan={TABLE_MONTHS.length + 1}
                >
                    {}
                </th>
            </tr>
        </thead>
    );
};

export default ExpenseHeader;
