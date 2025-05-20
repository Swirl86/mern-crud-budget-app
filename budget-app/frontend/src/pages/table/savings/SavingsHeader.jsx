import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import TitleHeader from "@table/TitleHeader";

const SavingsHeader = ({ onAdd = () => {} }) => {
    return (
        <thead>
            <tr>
                <TitleHeader title={TABLE_TITLES.SAVINGS} type="saving" onAdd={onAdd} />
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

export default SavingsHeader;
