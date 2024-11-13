import React from "react";
import { Category } from "../data/types";
import { FiEdit } from "react-icons/fi"; // Import edit icon

type QuizCategoryCardProps = {
    quiz: Category;
    onEdit: () => void; // Edit handler
    
};

const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({ quiz, onEdit }) => {
    return (
        <div className="relative bg-white shadow-md rounded-xl p-4">
            <button
                onClick={onEdit}
                className="absolute top-2 right-2 bg-gray-100 p-1 rounded-full hover:bg-gray-200"
            >
                <FiEdit className="text-gray-600" />
            </button>
            <h1 className="text-lg font-bold">{quiz.category}</h1>
            <p className="text-sm text-gray-500">{quiz.info}</p>
        </div>
    );
};

export default QuizCategoryCard;
