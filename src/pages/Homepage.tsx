import { BsArrowRight } from "react-icons/bs";
import heroImage from "../assets/hero.png";
import { quiz_data } from "../data/data";
import { Link } from "react-router-dom";
const HomePage = () => {
    const quiz_topics = quiz_data.quizzes;
    return (
        <div>
            <div className="font-manrope p-4 flex justify-center items-center shadow-[0px_12px_6px_0px_rgba(0,_0,_0,_0.1)] h-20 w-full mb-4">
                <p className="font-semibold tracking-wider">
                    Programming Quiz Application
                </p>
            </div>
            <section className="bg-white font-inter">
                <div className="grid max-w-screen-2xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                    <div className="mr-auto place-self-center lg:col-span-7">
                        <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
                            Welcome to NT Quizzer Application
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl ">
                            Here you can give quizzes and test your knowledge in
                            your specific programming language.
                        </p>
                        <a
                            href="#quiz"
                            className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "
                        >
                            Get started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </a>
                    </div>
                    <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                        <img src={heroImage} alt="mockup" />
                    </div>
                </div>
            </section>
            <section className="bg-white " id="quiz">
                <div className="py-8 px-4 mx-auto max-w-screen-2xl sm:py-16 lg:px-6">
                    <div className="max-w-screen-md mb-8 lg:mb-16 font-manrope">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
                            Choose from one of the language listed below
                        </h2>
                        <p className="text-gray-500 sm:text-xl ">
                            Each Language has quizzes on different topics which
                            are from beginner level to advanced. Click on the
                            arrow icon to get started.
                        </p>
                    </div>
                    <div className="font-inter grid max-w-screen-2xl mx-auto space-y-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-12 md:space-y-0">
                        {quiz_topics.map((quiz, index) => (
                            <div
                                key={index}
                                className=" relative bg-white shadow-md rounded-xl"
                            >
                                <img
                                    src={quiz.logo}
                                    alt={`${quiz.topic} logo`}
                                    className="w-full h-[260px] object-contain rounded-t-xl"
                                />
                                <div className="p-4">
                                    <h1 className="text-[1.3rem] font-bold leading-[34px]">
                                        {quiz.topic}
                                    </h1>
                                    <p className="text-[0.9rem] text-gray-400">
                                        {quiz.info}
                                    </p>
                                </div>
                                <Link
                                    to={`/quiz/${quiz.topic}`}
                                    className="float-right p-2 hover:bg-gray-100 cursor-pointer mr-2 mb-2 rounded-full group"
                                >
                                    <BsArrowRight className="text-[1.5rem] text-gray-400" />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
