const ErrorMessage = ({ message }) => {
    return (
        <div
            className="mx-auto my-6 w-full max-w-xl flex items-center justify-center bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-md shadow-sm"
            role="alert"
        >
            <svg
                className="w-6 h-6 mr-2 text-red-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01M12 6a9 9 0 100 18 9 9 0 000-18z"
                />
            </svg>
            <span>{message?.message || "Ett fel inträffade."}</span>
        </div>
    );
};

export default ErrorMessage;
