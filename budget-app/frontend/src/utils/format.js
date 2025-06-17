export const formatSEK = (value) => {
    return new Intl.NumberFormat("sv-SE", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};

export const formatSEKRaw = (value) => {
    return new Intl.NumberFormat("sv-SE", {
        style: "decimal",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    })
        .format(value)
        .replace(/\u00A0/g, " ") // NBSP to space
        .replace("−", "-"); // Unicode minus to ordinary minus
};
