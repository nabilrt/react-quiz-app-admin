import React from "react";

type QuizCategory = {
    category: string;
    info: string;
};

type QuizCategoryCardProps = {
    quiz: QuizCategory;
    onClick: () => void;
};

const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({
    quiz,
    onClick,
}) => {
    return (
        <div
            onClick={onClick}
            className="cursor-pointer relative bg-white shadow-md rounded-xl"
        >
            <div className="p-4">
                <h1 className="text-[1.3rem] font-bold leading-[34px]">
                    {quiz.category}
                </h1>
                <p className="text-[0.9rem] text-gray-400">{quiz.info}</p>
            </div>
        </div>
    );
};

export default QuizCategoryCard;
