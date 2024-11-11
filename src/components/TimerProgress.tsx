// components/TimerProgress.tsx

import React from "react";

type TimerProgressProps = {
    timer: number;
    totalTime: number;
};

const TimerProgress: React.FC<TimerProgressProps> = ({ timer, totalTime }) => {
    return (
        <div>
            <div className="relative w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                    className={`bg-blue-500 h-4 rounded-full ${
                        timer < totalTime
                            ? "transition-all duration-1000 ease-linear"
                            : ""
                    }`}
                    style={{
                        width: `${((totalTime - timer) / totalTime) * 100}%`,
                    }}
                ></div>
            </div>

            <p className="text-right text-gray-500 mb-4">
                Time remaining: {timer}s
            </p>
        </div>
    );
};

export default TimerProgress;
