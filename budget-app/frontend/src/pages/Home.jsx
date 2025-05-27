import { ERROR_TYPES, LOADING_STATES } from "@/constants";
import { useBudget } from "@context/BudgetContext";
import ErrorMessage from "@ui/ErrorMessage";
import LoadingIndicator from "@ui/LoadingIndicator";
import FinancialTable from "../pages/table/FinancialTable";

const Home = () => {
    const { isLoading, error } = useBudget();

    const isFetching = isLoading === LOADING_STATES.FETCHING;
    const failedFetching = error === ERROR_TYPES.FETCH;
    return (
        <div className="home bg-gray-100 min-h-screen my-6">
            {isFetching && <LoadingIndicator />}
            {failedFetching && <ErrorMessage message={error} />}
            {!isFetching && !failedFetching && <FinancialTable />}
        </div>
    );
};

export default Home;
