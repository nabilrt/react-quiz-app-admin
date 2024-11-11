import React from "react";

type OptionCardProps = {
    text: string;
    checked: boolean;
    isCorrect?: boolean;
    isIncorrect?: boolean;
    onChange: () => void;
};

const OptionCard: React.FC<OptionCardProps> = ({
    text,
    checked,
    isCorrect = false,
    isIncorrect = false,
    onChange,
}) => {
    return (
        <div
            onClick={onChange}
            className={`flex items-center justify-center p-4 cursor-pointer border-2 rounded-lg shadow-lg
                ${checked ? "border-blue-500 bg-blue-50" : "border-gray-200"}
                ${isCorrect ? "border-green-500 bg-green-50" : ""}
                ${isIncorrect ? "border-red-500 bg-red-50" : ""}
                hover:shadow-md transition-all duration-200 ease-in-out`}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />
            <span
                className={`flex items-center text-center text-lg font-medium
                    ${isCorrect ? "text-green-600" : ""}
                    ${isIncorrect ? "text-red-600" : ""}
                    ${!isCorrect && !isIncorrect ? "text-gray-700" : ""}`}
            >
                {text}
            </span>
        </div>
    );
};

export default OptionCard;
