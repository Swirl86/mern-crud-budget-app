const LoadingIndicator = ({ message = "Laddar innehåll..." }) => {
    return (
        <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 mr-3"></div>
            <p className="text-blue-600 text-lg font-medium">{message}</p>
        </div>
    );
};

export default LoadingIndicator;
