import { BudgetTypes, TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import { formatSEKRaw } from "@utils/format";

const addKr = (value) => `${formatSEKRaw(value)} kr`;

export const prepareBudgetTableData = (budgetData, { formatted = true } = {}) => {
    const headers = [["Kategori", ...TABLE_MONTHS, TABLE_TITLES.TOTAL]];
    const sectionSums = {
        [BudgetTypes.INCOME]: Array(TABLE_MONTHS.length).fill(0),
        [BudgetTypes.EXPENSE]: Array(TABLE_MONTHS.length).fill(0),
        [BudgetTypes.SAVING]: Array(TABLE_MONTHS.length).fill(0),
    };
    const rows = [];
    const typeTitleMap = {
        [BudgetTypes.INCOME]: TABLE_TITLES.INCOMES,
        [BudgetTypes.EXPENSE]: TABLE_TITLES.EXPENSES,
        [BudgetTypes.SAVING]: TABLE_TITLES.SAVINGS,
    };
    const totalTitleMap = {
        [BudgetTypes.INCOME]: TABLE_TITLES.TOTAL_INCOME,
        [BudgetTypes.EXPENSE]: TABLE_TITLES.TOTAL_EXPENSES,
        [BudgetTypes.SAVING]: TABLE_TITLES.TOTAL_SAVINGS,
    };

    Object.values(BudgetTypes).forEach((typeKey) => {
        const sectionItems = budgetData[typeKey] || [];

        rows.push([typeTitleMap[typeKey], ...Array(TABLE_MONTHS.length).fill(""), ""]);

        sectionItems.forEach((item) => {
            const monthValuesRaw = TABLE_MONTHS.map(
                (month) => item.amounts?.[month.toLowerCase()] ?? 0
            );

            monthValuesRaw.forEach((val, i) => {
                sectionSums[typeKey][i] += val;
            });

            const rowTotalRaw = monthValuesRaw.reduce((sum, val) => sum + val, 0);

            const monthValues = formatted ? monthValuesRaw.map(formatSEKRaw) : monthValuesRaw;

            const totalValue = formatted ? addKr(rowTotalRaw) : rowTotalRaw;

            rows.push([item.category, ...monthValues, totalValue]);
        });

        const sectionTotalRaw = sectionSums[typeKey].reduce((sum, val) => sum + val, 0);
        const sectionTotalValues = formatted
            ? sectionSums[typeKey].map(addKr)
            : sectionSums[typeKey];

        const sectionTotal = formatted ? addKr(sectionTotalRaw) : sectionTotalRaw;

        rows.push([totalTitleMap[typeKey], ...sectionTotalValues, sectionTotal]);
    });

    const totalSumsRaw = TABLE_MONTHS.map(
        (_, i) =>
            sectionSums[BudgetTypes.INCOME][i] -
            sectionSums[BudgetTypes.EXPENSE][i] -
            sectionSums[BudgetTypes.SAVING][i]
    );

    const totalResultRaw = totalSumsRaw.reduce((sum, val) => sum + val, 0);

    const totalSums = formatted ? totalSumsRaw.map(addKr) : totalSumsRaw;

    const totalResult = formatted ? addKr(totalResultRaw) : totalResultRaw;

    rows.push([TABLE_TITLES.RESULT, ...totalSums, totalResult]);

    return {
        headers,
        rows,
        typeTitleMap,
        totalTitleMap,
    };
};
