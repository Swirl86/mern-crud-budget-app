import { formatSEK } from "@utils/format";

const FormattedRowCell = ({ value, textColor }) => {
    const formattedValue = formatSEK(value);

    return <td className={`px-4 py-2 border border-gray-300 ${textColor}`}>{formattedValue}</td>;
};

export default FormattedRowCell;
