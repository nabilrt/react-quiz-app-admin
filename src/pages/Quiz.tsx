import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { Category } from "../data/types"; // Adjust imports as needed
import QuizCategorySelection from "../components/QuizCategorySelection";
import {
    addCategoryToQuiz,
    deleteQuizCategory,
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
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const [apiLoading, setApiLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        const fetchQuizCategories = async () => {
            setApiLoading(true);
            try {
                const response = await getQuizByTopic(id);
                setQuizCategories(response.data.categories);
                setApiLoading(false);
            } catch (err) {
                setApiLoading(false);
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
        setLoading(true);
        if (isEditMode && selectedCategory) {
            try {
                const response = await updateCategoryToQuiz(id, data._id, data);
                setQuizCategories(response.data.category);
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
            }
        } else {
            try {
                const response = await addCategoryToQuiz(id, data);
                setQuizCategories(response.data.category);
                setLoading(false);
            } catch (error: any) {
                setLoading(false);
            }
        }
        closeModal();
    };

    const categoryDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteQuizCategory(id, selectedCategory?._id);
            setQuizCategories(
                quizCategories.filter((q) => q._id !== selectedCategory?._id)
            );
            setDeleteLoading(false);
            setIsModalOpen(false);
        } catch (error) {
            setDeleteLoading(false);
            console.error(error);
        }
    };

    return (
        <div className="">
            {apiLoading ? (
                <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
            ) : (
                <>
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
                            className={
                                "fixed inset-0 z-50 flex items-center transition-all duration-300 justify-center bg-black bg-opacity-50"
                            }
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
                                    <button
                                        className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                                        onClick={closeModal}
                                        disabled={loading || deleteLoading}
                                    >
                                        <RxCross1 size={15} />
                                    </button>
                                </div>
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className=""
                                >
                                    <div className="mb-4">
                                        <label
                                            htmlFor="name"
                                            className="text-[15px] font-[400]"
                                        >
                                            Category{" "}
                                            <span className="text-red-500">
                                                *
                                            </span>
                                        </label>
                                        <input
                                            type="text"
                                            id="category"
                                            {...register("category", {
                                                required: true,
                                                pattern: {
                                                    value: /^[A-Za-z\s]+$/,
                                                    message:
                                                        "Topic can only contain letters and spaces",
                                                },
                                            })}
                                            className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                            placeholder="Enter category name"
                                        />
                                        {errors.category && (
                                            <span className="text-red-500 text-sm">
                                                {errors.category.message}
                                            </span>
                                        )}
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
                                        {...register("info", {
                                            required: true,
                                        })}
                                        className="border-[#e5eaf2] border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-[#3B9DF8] transition-colors duration-300"
                                        placeholder="Enter category info"
                                    ></textarea>
                                    {errors.info && (
                                        <span className="text-red-500 text-sm">
                                            {errors.info.message}
                                        </span>
                                    )}
                                    <div className="flex gap-2">
                                        <button
                                            type="submit"
                                            className=" w-full bg-emerald-400 hover:bg-emerald-600 text-white rounded-md py-2 px-4"
                                        >
                                            <>
                                                {loading
                                                    ? "Loading"
                                                    : isEditMode
                                                    ? "Update Category"
                                                    : "Create Category"}
                                            </>
                                        </button>
                                        {isEditMode && (
                                            <button
                                                type="button"
                                                className="py-2 px-4 w-full bg-red-400 hover:bg-red-600 text-[#fff] rounded-md"
                                                onClick={categoryDelete}
                                            >
                                                {deleteLoading
                                                    ? "Deleting..."
                                                    : "Delete"}
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default QuizPage;
