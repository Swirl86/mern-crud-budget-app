import { formatSEK } from "@utils/format";

const FormattedSumCell = ({ amounts = {} }) => {
    const total = Object.values(amounts).reduce((sum, amount) => sum + amount, 0);

    return (
        <td className="px-4 py-2 border border-gray-300 bg-gray-100 w-[120px] min-w-0 text-center">
            <span>{total ? formatSEK(total) + " kr" : "0 kr"}</span>
        </td>
    );
};

export default FormattedSumCell;
