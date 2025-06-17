import { TABLE_MONTHS, TABLE_TITLES } from "@/constants";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { prepareBudgetTableData } from "./prepareBudgetExportTableData";

export const exportToCSV = (budgetData, separator = ";") => {
    const { headers, rows } = prepareBudgetTableData(budgetData, { formatted: false });
    const allRows = [...headers, ...rows];

    const escapeCell = (cell) => {
        if (cell == null) return "";
        const str = String(cell);
        const escaped = str.replace(/"/g, '""');
        return `"${escaped}"`;
    };

    const csvContent =
        "data:text/csv;charset=utf-8," +
        allRows.map((row) => row.map(escapeCell).join(separator)).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${budgetData.title}_budget.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
};

export const exportToExcel = (budgetData) => {
    const { headers, rows } = prepareBudgetTableData(budgetData, { formatted: true });

    const wsData = [...headers, ...rows];

    const worksheet = XLSX.utils.aoa_to_sheet(wsData);

    const columnWidths = headers[0].map(() => ({ wch: 15 }));
    worksheet["!cols"] = columnWidths;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Budget");

    XLSX.writeFile(workbook, `${budgetData.title}_budget.xlsx`);
};

export const exportToPDF = (budgetData) => {
    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
    });

    doc.setFontSize(12);
    doc.text(`${budgetData.title} Budget`, 14, 16);

    const { headers, rows, typeTitleMap, totalTitleMap } = prepareBudgetTableData(budgetData, {
        formatted: true,
    });

    autoTable(doc, {
        head: headers,
        body: rows,
        startY: 20,
        styles: { fontSize: 8 },
        headStyles: {
            fillColor: [41, 128, 185],
            textColor: 255,
            fontStyle: "bold",
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
        margin: { left: 14, right: 14 },
        tableLineWidth: 0.1,
        tableLineColor: 200,
        didParseCell: (data) => {
            const cellText = data.cell.raw;

            if (
                (Object.values(typeTitleMap).includes(cellText) ||
                    Object.values(totalTitleMap).includes(cellText) ||
                    cellText === TABLE_TITLES.RESULT) &&
                data.row.index !== 0
            ) {
                data.cell.styles.fontStyle = "bold";
                data.cell.styles.fillColor = [220, 230, 240];
            }

            if (Object.values(typeTitleMap).includes(cellText) && data.column.index === 0) {
                data.cell.colSpan = TABLE_MONTHS.length + 2;
                data.cell.styles.fontSize = 10;
                data.cell.styles.halign = "left";
                data.cell.styles.fillColor = [200, 215, 230];
            }
            if (Object.values(typeTitleMap).includes(cellText) && data.column.index > 0) {
                data.cell.text = "";
            }

            if (data.column.index === TABLE_MONTHS.length + 1 && data.row.index !== 0) {
                data.cell.styles.fillColor = [230, 240, 255];
            }

            if (
                (Object.values(totalTitleMap).includes(cellText) ||
                    cellText === TABLE_TITLES.RESULT) &&
                data.row.index !== 0
            ) {
                if (cellText === totalTitleMap.income) {
                    data.cell.styles.fillColor = [200, 230, 200];
                } else if (cellText === totalTitleMap.expense) {
                    data.cell.styles.fillColor = [255, 200, 200];
                } else if (cellText === totalTitleMap.saving) {
                    data.cell.styles.fillColor = [200, 220, 255];
                } else if (cellText === TABLE_TITLES.RESULT) {
                    data.cell.styles.fillColor = [220, 220, 220];
                } else {
                    data.cell.styles.fillColor = [210, 210, 240];
                }
            }
        },
    });

    doc.save(`${budgetData.title}_budget.pdf`);
};
