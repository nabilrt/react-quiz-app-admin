import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
    createQuiz,
    deleteQuiz,
    getAllQuizzes,
    updateQuiz,
} from "../lib/api/index"; // Replace with actual API paths
import { Quiz } from "../data/types";
import QuizTopic from "../components/QuizTopic";
import { RxCross1 } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";

type FormValues = {
    topic: string;
    description: string;
    image: File | null;
};

const QuizIndex: React.FC = () => {
    const [quizTopics, setQuizTopics] = useState<Quiz[]>([]);
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
    const [imageLink, setImageLink] = useState("");
    const [deleteLoading, setDeleteLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<FormValues>();
    const [loading, setLoading] = useState(false);
    const [apiLoading, setApiLoading] = useState(false);

    const openEditModal = (quiz: Quiz) => {
        setisModalOpen(true);
        setIsEditMode(true);
        setCurrentQuiz(quiz);
        setValue("topic", quiz.topic);
        setValue("description", quiz.info);
        setImageLink(quiz.logo); // Display current image
    };

    const closeModal = () => {
        reset();
        setImageLink("");
        setisModalOpen(false);
        setIsEditMode(false);
        setCurrentQuiz(null);
    };

    const handleUploadImageClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Prevents form submission
        document?.getElementById("fourthImage")!.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const imageURL = URL.createObjectURL(files[0]);
            setImageLink(imageURL);
            setValue("image", files[0]); // Set files in form state and trigger validation
        }
    };

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setLoading(true);
        const formData = new FormData();
        formData.append("topic", data.topic);
        formData.append("info", data.description);
        if (data.image) {
            formData.append("file", data.image);
        }

        try {
            if (isEditMode && currentQuiz) {
                const response = await updateQuiz(currentQuiz._id, formData);
                console.log(response.data.quiz);
                setQuizTopics(
                    quizTopics.map((q) =>
                        q._id === currentQuiz._id ? response.data.quiz : q
                    )
                );
                setLoading(false);
                closeModal();
            } else {
                // Create quiz
                const response = await createQuiz(formData);
                setQuizTopics([...quizTopics, response.data.quiz]);
                setLoading(false);
            }
            closeModal();
            reset();
        } catch (error) {
            setLoading(false);
            console.error("Error submitting form:", error);
        }
    };

    const getQuizzes = async () => {
        setApiLoading(true);
        try {
            const response = await getAllQuizzes();
            setQuizTopics(response.data);
            setApiLoading(false);
        } catch (error) {
            setApiLoading(false);
            console.error(error);
        }
    };

    const quizDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteQuiz(currentQuiz?._id);
            setQuizTopics(quizTopics.filter((q) => q._id !== currentQuiz?._id));
            setDeleteLoading(false);
            closeModal();
        } catch (error) {
            setDeleteLoading(false);
            console.error(error);
        }
    };

    useEffect(() => {
        getQuizzes();
    }, []);

    return (
        <section className="bg-white" id="quiz">
            {apiLoading ? (
                <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
            ) : (
                <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
                    <button
                        className="px-4 py-2 bg-emerald-400 hover:bg-emerald-600 text-[#fff] rounded font-lexend"
                        onClick={() => setisModalOpen(true)}
                    >
                        Create Quiz
                    </button>

                    <div
                        className={`${
                            isModalOpen ? " visible" : " invisible"
                        } w-full h-screen fixed top-0 left-0 z-50 bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
                    >
                        <div
                            className={`${
                                isModalOpen
                                    ? " scale-[1] opacity-100"
                                    : " scale-[0] opacity-0"
                            } w-[90%] md:w-[80%] lg:w-[35%] bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8`}
                        >
                            <div className="w-full flex items-end p-4 justify-between ">
                                <h1 className="text-[1.5rem] font-bold">
                                    {isEditMode ? "Edit Quiz" : "Create Quiz"}
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
                                className="flex flex-col gap-5 p-4"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                {/* File Upload */}
                                <div className="file-upload text-center m-auto">
                                    <input
                                        type="file"
                                        id="fourthImage"
                                        accept="image/*"
                                        className="hidden"
                                        {...register("image", {
                                            required: true,
                                        })}
                                        onChange={(e) => {
                                            handleFileChange(e); // Custom handler for file change
                                        }}
                                    />
                                    <div className="w-[150px] h-[150px] rounded-full border border-[#e5eaf2] flex items-center justify-center">
                                        {imageLink ? (
                                            <img
                                                src={imageLink}
                                                alt="profile"
                                                className="w-full h-full object-cover rounded-full"
                                            />
                                        ) : (
                                            <CgProfile className="text-[10rem] text-[#e5eaf2]" />
                                        )}
                                    </div>
                                    <button
                                        className="px-4 py-2 bg-emerald-400 hover:bg-emerald-600 text-white rounded-md mt-5"
                                        onClick={handleUploadImageClick}
                                    >
                                        Upload logo
                                    </button>
                                    {errors.image && (
                                        <span className="text-red-500 text-sm">
                                            {errors.image.message}
                                        </span>
                                    )}
                                </div>

                                {/* Topic */}
                                <label htmlFor="topic">Topic</label>
                                <input
                                    type="text"
                                    id="topic"
                                    placeholder="Quiz Topic"
                                    {...register("topic", {
                                        required: true,
                                        pattern: {
                                            value: /^[A-Za-z\s]+$/,
                                            message:
                                                "Topic can only contain letters and spaces",
                                        },
                                    })}
                                    className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                />
                                {errors.topic && (
                                    <span className="text-red-500 text-sm">
                                        {errors.topic.message}
                                    </span>
                                )}

                                {/* Description */}
                                <label htmlFor="description">Description</label>
                                <textarea
                                    id="description"
                                    placeholder="Write something about the quiz"
                                    {...register("description", {
                                        required: true,
                                    })}
                                    className="border-[#e5eaf2] border rounded-md outline-none mt-1 px-4 w-full py-3 min-h-[200px] focus:border-[#3B9DF8] transition-colors duration-300"
                                ></textarea>
                                {errors.description && (
                                    <span className="text-red-500 text-sm">
                                        {errors.description.message}
                                    </span>
                                )}

                                <div className="flex gap-2">
                                    <button
                                        type="submit"
                                        className="py-2 px-4 w-full bg-emerald-400 hover:bg-emerald-600 text-[#fff] rounded-md"
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
                                            onClick={quizDelete}
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

                    <div className="font-inter grid max-w-screen-2xl mt-8 mx-auto space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
                        {quizTopics.map((quiz) => (
                            <QuizTopic
                                key={quiz._id}
                                quiz={quiz}
                                onEdit={openEditModal}
                            />
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
};

export default QuizIndex;
