// components/QuizCategorySelection.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import QuizCategoryCard from "./QuizCategoryCard";
import { Category } from "../data/types";
import ReturnIcon from "../icons/ReturnIcon";

type QuizCategorySelectionProps = {
    quizCategories: Category[];
    openEditModal: (category: Category) => void; // Pass edit modal function
    openCreateModal: () => void; // Pass create mod
};

const QuizCategorySelection: React.FC<QuizCategorySelectionProps> = ({
    quizCategories,
    openEditModal,
    openCreateModal,
}) => {
    const navigate = useNavigate();

    return (
        <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
            <div className="max-w-screen-2xl mb-8 lg:mb-16 font-manrope">
                <button
                    type="button"
                    className="text-black hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mb-2"
                    onClick={() => navigate("/admin/quiz")}
                >
                    <ReturnIcon />
                </button>
                <div className="mt-2">
                    <button
                        className="px-4 py-2 mb-4 bg-emerald-400 hover:bg-emerald-600 text-[#fff] rounded font-lexend"
                        onClick={openCreateModal}
                    >
                        Create New Category
                    </button>
                </div>
            </div>
            <div className="font-inter grid max-w-screen-2xl mx-auto space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0 -ml-8">
                {quizCategories.map((quiz) => (
                    <QuizCategoryCard
                        key={quiz._id}
                        quiz={quiz}
                        onEdit={() => openEditModal(quiz)} // Open modal on edit button click
                    />
                ))}
            </div>
        </div>
    );
};

export default QuizCategorySelection;
