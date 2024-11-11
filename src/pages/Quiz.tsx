import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { quiz_data } from "../data/data"; // Assume quiz_data is typed as Quiz[]
import { Quiz, Category } from "../data/types"; // Import types if placed in a separate file
import OptionCard from "../components/OptionCard";
import QuizHeader from "../components/QuizHeader";
import QuizCategorySelection from "../components/QuizCategorySelection";
import TimerProgress from "../components/TimerProgress";
import ReturnIcon from "../icons/ReturnIcon";
import CrossIcon from "../icons/CrossIcon";
import ScoreSection from "../components/ScoreSection";

type Params = {
    lang: string;
};

const QuizPage: React.FC = () => {
    const { lang } = useParams<Params>();
    const quiz_categories =
        quiz_data.quizzes.find((q: Quiz) => q.topic === lang)?.categories || [];
    const [selectedQuiz, setSelectedQuiz] = useState<Category | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
    const [answers, setAnswers] = useState<{ [key: number]: string[] }>({});
    const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
    const [timer, setTimer] = useState<number>(15); // Timer for each question

    useEffect(() => {
        let interval: any;

        if (selectedQuiz && !isQuizComplete) {
            // Reset timer to 15 seconds for each new question
            setTimer(15);
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer === 1) {
                        nextQuestion(); // Automatically move to the next question
                        return 15; // Reset timer
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval); // Clear interval on unmount or question change
        };
    }, [currentQuestionIndex, selectedQuiz, isQuizComplete]);

    const startQuiz = (quiz: Category) => {
        setSelectedQuiz(quiz);
        setCurrentQuestionIndex(0);
        setAnswers({});
    };

    const handleAnswerChange = (questionIndex: number, option: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = prevAnswers[questionIndex]
                ? [...prevAnswers[questionIndex]]
                : [];
            if (updatedAnswers.includes(option)) {
                return {
                    ...prevAnswers,
                    [questionIndex]: updatedAnswers.filter(
                        (ans) => ans !== option
                    ),
                };
            } else {
                return {
                    ...prevAnswers,
                    [questionIndex]: [...updatedAnswers, option],
                };
            }
        });
    };

    const nextQuestion = () => {
        if (
            selectedQuiz &&
            currentQuestionIndex < selectedQuiz.questions.length - 1
        ) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setTimer(15); // Immediately reset timer without animation
        } else {
            setIsQuizComplete(true);
        }
    };

    const prevQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
            setTimer(15); // Immediately reset timer without animation
        }
    };

    const calculateScore = (): number => {
        let score = 0;
        if (selectedQuiz) {
            selectedQuiz.questions.forEach((question, index) => {
                if (
                    answers[index] &&
                    question.answer.every((ans) =>
                        answers[index].includes(ans)
                    ) &&
                    answers[index].length === question.answer.length
                ) {
                    score++;
                }
            });
        }
        return score;
    };

    return (
        <div>
            <QuizHeader lang={lang} />

            {!selectedQuiz && !isQuizComplete && (
                <section className="bg-white">
                    <QuizCategorySelection
                        lang={lang}
                        quizCategories={quiz_categories}
                        startQuiz={startQuiz}
                    />
                </section>
            )}

            {selectedQuiz && !isQuizComplete && (
                <section className="bg-white py-8 px-4 mx-auto max-w-screen-2xl">
                    <button
                        type="button"
                        className="text-black hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mb-2"
                        onClick={() => {
                            setSelectedQuiz(null);
                            setIsQuizComplete(false);
                            setTimer(15); // Immediately reset timer to 15
                        }}
                    >
                        <ReturnIcon />
                    </button>
                    <div className="mb-8 font-manrope">
                        <h2 className="text-2xl font-semibold mb-6">
                            Question {currentQuestionIndex + 1} of{" "}
                            {selectedQuiz.questions.length}
                        </h2>
                        <p className="text-gray-700 mb-4">
                            {
                                selectedQuiz.questions[currentQuestionIndex]
                                    .question
                            }
                        </p>

                        {/* Timer Progress Bar */}
                        <TimerProgress timer={timer} totalTime={15} />

                        <div className="grid grid-cols-2 gap-2">
                            {selectedQuiz.questions[
                                currentQuestionIndex
                            ].options.map((option, optIndex) => (
                                <OptionCard
                                    key={optIndex}
                                    text={option.answer}
                                    checked={
                                        answers[currentQuestionIndex]?.includes(
                                            option.answer
                                        ) || false
                                    }
                                    onChange={() =>
                                        handleAnswerChange(
                                            currentQuestionIndex,
                                            option.answer
                                        )
                                    }
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={prevQuestion}
                                disabled={currentQuestionIndex === 0}
                                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={nextQuestion}
                                className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                {currentQuestionIndex ===
                                selectedQuiz.questions.length - 1
                                    ? "Finish"
                                    : "Next"}
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {isQuizComplete && (
                <section className="bg-white py-8 px-4 mx-auto max-w-screen-2xl">
                    <div className="mb-8 font-manrope">
                        <ScoreSection
                            score={calculateScore()}
                            totalScore={selectedQuiz!.questions.length * 5}
                        />
                        {selectedQuiz?.questions.map((question, qIndex) => {
                            const isQuestionIncorrect = answers[qIndex]
                                ? !question.answer.every((ans) =>
                                      answers[qIndex].includes(ans)
                                  ) ||
                                  answers[qIndex].length !==
                                      question.answer.length
                                : true;

                            return (
                                <div
                                    key={qIndex}
                                    className="border border-gray-200 p-4 mb-4 rounded-lg"
                                >
                                    <div className="flex items-center space-x-2 mb-2">
                                        <h3 className="text-lg font-semibold">
                                            {question.question}
                                        </h3>
                                        {/* Render the cross icon if the question is answered incorrectly */}
                                        {isQuestionIncorrect && <CrossIcon />}
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {question.options.map(
                                            (option, optIndex) => (
                                                <OptionCard
                                                    key={optIndex}
                                                    text={option.answer}
                                                    checked={
                                                        answers[
                                                            qIndex
                                                        ]?.includes(
                                                            option.answer
                                                        ) || false
                                                    }
                                                    isCorrect={question.answer.includes(
                                                        option.answer
                                                    )}
                                                    isIncorrect={
                                                        answers[
                                                            qIndex
                                                        ]?.includes(
                                                            option.answer
                                                        ) &&
                                                        !question.answer.includes(
                                                            option.answer
                                                        )
                                                    }
                                                    onChange={() => {}}
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                        <button
                            onClick={() => {
                                setIsQuizComplete(false);
                                setSelectedQuiz(null);
                            }}
                            className="mt-8 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5"
                        >
                            Back to Categories
                        </button>
                    </div>
                </section>
            )}
        </div>
    );
};

export default QuizPage;
