// components/ScoreSection.tsx

import React from "react";

type ScoreSectionProps = {
    score: number;
    totalScore: number;
    threshold?: number; // Optional threshold to determine success message
};

const ScoreSection: React.FC<ScoreSectionProps> = ({
    score,
    totalScore,
    threshold = 0.5,
}) => {
    const isSuccess = score * 5 >= totalScore * threshold;

    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md flex items-center justify-center mb-6 font-inter">
            <div className="text-center">
                <p className="text-lg font-medium text-gray-700 mb-1">
                    Your Score
                </p>
                <div className="flex items-baseline justify-center mb-3">
                    <span
                        className={`text-4xl font-extrabold ${
                            isSuccess ? "text-emerald-500" : "text-red-600"
                        } mr-2`}
                    >
                        {score * 5}
                    </span>
                    <span className="text-xl text-gray-600">out of</span>
                    <span className="text-4xl font-extrabold text-gray-800 ml-2">
                        {totalScore}
                    </span>
                </div>
                <span
                    className={`text-xl font-semibold ${
                        isSuccess ? "text-emerald-500" : "text-red-600"
                    }`}
                >
                    {isSuccess
                        ? "Congratulations! You have done well."
                        : "Better Luck Next Time"}
                </span>
            </div>
        </div>
    );
};

export default ScoreSection;
