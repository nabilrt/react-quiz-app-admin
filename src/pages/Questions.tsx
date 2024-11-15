import React, { useEffect, useState } from "react";
import {
    useForm,
    useFieldArray,
    Controller,
    SubmitHandler,
} from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Select, { MultiValue } from "react-select";
import { getQuestionsForQuiz, updateQuestinsToQuiz } from "../lib/api";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReturnIcon from "../icons/ReturnIcon";
import { IoAddCircleOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import AlertMessage from "../components/Questions/AlertMessage";
import OptionsFieldArray from "../components/Questions/OptionFieldsArray";

type Option = {
    answer: string;
};

type Question = {
    question: string;
    options: Option[];
    answer: string[];
};

type FormValues = {
    questions: Question[];
};

type SelectOption = {
    value: string;
    label: string;
};

const QuestionManagement: React.FC = () => {
    const { id: quizId, categoryId } = useParams<{
        id: string;
        categoryId: string;
    }>();

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);

    let navigate = useNavigate();

    const { control, handleSubmit, setValue, watch } = useForm<FormValues>({
        defaultValues: {
            questions: [
                {
                    question: "",
                    options: Array(4).fill({ answer: "" }),
                    answer: [],
                },
            ],
        },
    });

    const {
        fields: questionFields,
        append: appendQuestion,
        remove: removeQuestion,
    } = useFieldArray({
        control,
        name: "questions",
    });

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getQuestionsForQuiz(quizId, categoryId);
                const questions: Question[] = response.data.questions.length
                    ? response.data.questions
                    : [
                          {
                              question: "",
                              options: Array(4).fill({ answer: "" }),
                              answer: [],
                          },
                      ];
                setValue("questions", questions);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };
        fetchData();
    }, [quizId, categoryId, setValue]);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await updateQuestinsToQuiz(quizId, categoryId, {
                questions: data.questions,
            });
            setSuccessMessage(true);
            console.log("Update successful:", response.data);
        } catch (error) {
            console.log("Error updating questions:", error);
            setErrorMessage(true);
        } finally {
            setTimeout(() => {
                setSuccessMessage(false);
                setErrorMessage(false);
            }, 2000);
        }
    };

    const addQuestion = () => {
        appendQuestion({
            question: "",
            options: Array(4).fill({ answer: "" }),
            answer: [],
        });
    };

    const questions = watch("questions");

    const isFormValid =
        questions.length >= 4 &&
        questions.every(
            (q) =>
                q.question.trim() !== "" &&
                q.options.length >= 4 &&
                q.options.length <= 8 &&
                q.options.every((opt) => opt.answer.trim() !== "") &&
                q.answer.length > 0
        );

    return (
        <div className="w-full mx-auto p-4">
            {loading ? (
                <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="">
                    <div className="flex mb-1 items-center">
                        <button
                            type="button"
                            className="text-black hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
                            onClick={() => navigate(-1)}
                        >
                            <ReturnIcon />
                        </button>
                        <AlertMessage
                            successMessage={successMessage}
                            errorMessage={errorMessage}
                        />
                        <div className="ml-auto flex gap-2">
                            <button
                                type="button"
                                onClick={addQuestion}
                                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition duration-200"
                            >
                                <IoAddCircleOutline />
                            </button>

                            <button
                                type="submit"
                                disabled={!isFormValid}
                                className={`px-4 py-2 rounded-lg font-semibold transition duration-200 ${
                                    isFormValid
                                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                }`}
                            >
                                <FaCheck />
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 font-manrope">
                        {questionFields.map((field, questionIndex) => {
                            return (
                                <div
                                    key={field.id}
                                    className="relative mb-1 p-4 border border-gray-300 rounded-lg bg-gray-50"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            removeQuestion(questionIndex)
                                        }
                                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-semibold"
                                    >
                                        <RiDeleteBin5Line />
                                    </button>

                                    <label
                                        htmlFor="name"
                                        className="text-[15px] font-semibold"
                                    >
                                        Question{" "}
                                        <span className="text-red-500">*</span>
                                    </label>
                                    <Controller
                                        name={`questions.${questionIndex}.question`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                placeholder={`Question ${
                                                    questionIndex + 1
                                                }`}
                                                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300 mb-2"
                                                required
                                            />
                                        )}
                                    />
                                    <OptionsFieldArray
                                        control={control}
                                        questionIndex={questionIndex}
                                        options={field.options}
                                    />

                                    <Controller
                                        name={`questions.${questionIndex}.answer`}
                                        control={control}
                                        render={({ field }) => {
                                            const selectedOptions =
                                                field.value.map(
                                                    (answer: string) => ({
                                                        value: answer,
                                                        label: answer,
                                                    })
                                                );

                                            const options =
                                                questions[
                                                    questionIndex
                                                ]?.options
                                                    .filter(
                                                        (opt) =>
                                                            opt.answer.trim() !==
                                                            ""
                                                    )
                                                    .map((opt) => ({
                                                        value: opt.answer,
                                                        label: opt.answer,
                                                    })) || [];

                                            const handleSelectChange = (
                                                selected: MultiValue<SelectOption>
                                            ) => {
                                                field.onChange(
                                                    selected
                                                        ? selected.map(
                                                              (opt) => opt.value
                                                          )
                                                        : []
                                                );
                                            };

                                            return (
                                                <Select<SelectOption, true>
                                                    value={selectedOptions}
                                                    isMulti
                                                    options={options}
                                                    className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300 mb-2"
                                                    placeholder="Select correct answers"
                                                    onChange={
                                                        handleSelectChange
                                                    }
                                                />
                                            );
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </form>
            )}
        </div>
    );
};


export default QuestionManagement;
