export const formatSEK = (value) => {
    return new Intl.NumberFormat("sv-SE", {
        style: "decimal",
        //minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};
