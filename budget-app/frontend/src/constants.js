export const TABLE_TITLES = {
    INCOMES: "INKOMSTER",
    EXPENSES: "UTGIFTER",
    TOTAL: "Total",
    SUM: "Summa",
    OTHER_INCOME: "Övrig inkomst",
    TOTAL_INCOME: "Tot. inkomst",
    TOTAL_EXPENSES: "Tot. utgifter",
    TOTAL_SAVINGS: "Tot. sparande",
    RESULT: "Resultat",
    SAVINGS: "SPARANDE",
};

export const TABLE_MONTHS = [
    "Januari",
    "Februari",
    "Mars",
    "April",
    "Maj",
    "Juni",
    "Juli",
    "Augusti",
    "September",
    "Oktober",
    "November",
    "December",
];

export const BudgetTypes = {
    INCOME: "income",
    EXPENSE: "expense",
    SAVING: "saving",
};

export const LOADING_STATES = {
    IDLE: "idle",
    FETCHING: "fetching",
    ADDING: "adding",
    CLEARING_ALL_ITEMS: "clearingAllItems",
    DELETING_ITEM: "deletingItem",
    DELETING_BUDGET: "deletingBudget",
    UPDATING_ITEM: "updatingItem",
    UPDATING_ORDER: "updatingOrder",
};

export const ERROR_TYPES = {
    FETCH_ERROR: "FETCH_ERROR",
    ADD_ERROR: "ADD_ERROR",
    UPDATE_ERROR: "UPDATE_ERROR",
    DELETE_ITEM_ERROR: "DELETE_ITEM_ERROR",
    CLEAR_ALL_ITEMS_ERROR: "CLEAR_ALL_ITEMS_ERROR",
    DELETE_BUDGET_ERROR: "DELETE_BUDGET_ERROR",
    REORDER_ERROR: "REORDER_ERROR",
};

export const DEFAULT_BUDGET = {
    title: "Ny budget",
    items: [],
};
