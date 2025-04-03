import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";

const ResultRow = ({ incomeData, expensesData, savingsData }) => {
    const monthlyResults = TABLE_MONTHS.map((month) => {
        const monthKey = month.toLowerCase();

        const totalIncomeForMonth = incomeData.reduce((sum, income) => {
            return sum + (income[monthKey] || 0);
        }, 0);

        const totalExpenseForMonth = expensesData.reduce((sum, expense) => {
            return sum + (expense[monthKey] || 0);
        }, 0);

        const totalSavingsForMonth = savingsData.reduce((sum, saving) => {
            return sum + (saving[monthKey] || 0);
        }, 0);

        const totalExpenditureForMonth = totalExpenseForMonth + totalSavingsForMonth;

        return totalIncomeForMonth - totalExpenditureForMonth;
    });

    const totalResult = monthlyResults.reduce((acc, result) => acc + result, 0);

    return (
        <tr className="bg-gray-200 font-bold">
            <td className="px-4 py-2 border border-gray-300 font-semibold bg-gray-400">
                {TABLE_TITLES.RESULT}
            </td>
            {monthlyResults.map((result, index) => (
                <td
                    key={index}
                    className={`px-4 py-2 border border-gray-300 ${
                        result < 0 ? "text-red-500" : "text-green-500"
                    }`}
                >
                    {new Intl.NumberFormat("sv-SE").format(result)}
                </td>
            ))}
            <td className="px-4 py-2 border border-gray-300 font-semibold">
                {new Intl.NumberFormat("sv-SE").format(totalResult)} Kr
            </td>
        </tr>
    );
};

export default ResultRow;
