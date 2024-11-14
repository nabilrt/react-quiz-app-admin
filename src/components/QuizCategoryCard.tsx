import React from "react";
import { Category } from "../data/types";
import { FiEdit } from "react-icons/fi"; // Import edit icon
import { Link, useParams } from "react-router-dom";

type QuizCategoryCardProps = {
    quiz: Category;
    onEdit: () => void; // Edit handler
};

const QuizCategoryCard: React.FC<QuizCategoryCardProps> = ({
    quiz,
    onEdit,
}) => {
    let { id } = useParams();
    return (
        <div className="relative bg-white shadow-md rounded-xl max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto p-6 md:p-8 lg:p-10">
            <button
                onClick={onEdit}
                className="absolute top-3 right-3 bg-gray-100 p-1.5 rounded-full hover:bg-gray-200"
            >
                <FiEdit className="text-gray-600" />
            </button>
            <Link
                to={`/admin/quiz/${id}/${quiz._id}`}
                className="text-lg font-bold cursor-pointer hover:underline"
            >
                {quiz.category}
            </Link>
            <p className="text-sm text-gray-500 mt-2">{quiz.info}</p>
        </div>
    );
};

export default QuizCategoryCard;
