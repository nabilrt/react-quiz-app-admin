const AlertMessage: React.FC<{
    successMessage: boolean;
    errorMessage: boolean;
}> = ({ successMessage, errorMessage }) => {
    return (
        <>
            {successMessage && (
                <p className="text-emerald-500 font-lexend">
                    Quiz Saved Successfully!
                </p>
            )}
            {errorMessage && (
                <p className="text-red-500 font-lexend">
                    An Error Occurred. Try Again!
                </p>
            )}
        </>
    );
};

export default AlertMessage;
