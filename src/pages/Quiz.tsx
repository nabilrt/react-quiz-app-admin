import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category } from "../data/types"; // Adjust imports as needed
import QuizCategorySelection from "../components/QuizCategorySelection";
import {
    addCategoryToQuiz,
    getQuizByTopic,
    updateCategoryToQuiz,
} from "../lib/api";
import { RxCross1 } from "react-icons/rx";

type Params = {
    id: string;
};

type FormValues = {
    category: string;
    info: string;
    _id?: string;
};

const QuizPage: React.FC = () => {
    const { id } = useParams<Params>();
    const [quizCategories, setQuizCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(
        null
    );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const { register, handleSubmit, setValue, reset } = useForm<FormValues>();

    useEffect(() => {
        const fetchQuizCategories = async () => {
            try {
                const response = await getQuizByTopic(id);
                setQuizCategories(response.data.categories);
            } catch (err) {
                console.error("Error fetching quiz categories:", err);
            }
        };
        fetchQuizCategories();
    }, [id]);

    const openCreateModal = () => {
        reset(); // Clear form for creating a new category
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const openEditModal = (category: Category) => {
        setSelectedCategory(category);
        setValue("category", category.category); // Populate form with category data
        setValue("info", category.info);
        setValue("_id", category._id);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        reset();
        setIsModalOpen(false);
        setSelectedCategory(null);
    };

    const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
        console.log(data);
        if (isEditMode && selectedCategory) {
            const response = await updateCategoryToQuiz(id, data._id, data);
            setQuizCategories(
                quizCategories.map((q) =>
                    q._id === data._id ? response.data.category : q
                )
            );
        } else {
            const response = await addCategoryToQuiz(id, data);
            setQuizCategories(response.data.category);
        }
        closeModal();
    };

    return (
        <div className="">
            <section className="bg-white">
                <QuizCategorySelection
                    quizCategories={quizCategories}
                    openEditModal={openEditModal}
                    openCreateModal={openCreateModal}
                />
            </section>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={closeModal}
                >
                    <div
                        className="relative w-full max-w-lg bg-white rounded-lg shadow-lg p-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-xl font-bold">
                                {isEditMode
                                    ? "Edit Category"
                                    : "Create Category"}
                            </h1>
                            <RxCross1
                                className="text-gray-500 cursor-pointer"
                                onClick={closeModal}
                            />
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="">
                            <div className="mb-4">
                                <label
                                    htmlFor="name"
                                    className="text-[15px] font-[400]"
                                >
                                    Category{" "}
                                    <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="category"
                                    {...register("category", {
                                        required: true,
                                    })}
                                    className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                    placeholder="Enter category name"
                                />
                            </div>

                            <label
                                htmlFor="description"
                                className="font-[400] text-[15px] "
                            >
                                Description{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="info"
                                {...register("info", { required: true })}
                                className="border-[#e5eaf2] border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-[#3B9DF8] transition-colors duration-300"
                                placeholder="Enter category info"
                            ></textarea>

                            <button
                                type="submit"
                                className="mt-4 w-full bg-emerald-400 hover:bg-emerald-600 text-white rounded-md py-2"
                            >
                                {isEditMode
                                    ? "Update Category"
                                    : "Create Category"}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
