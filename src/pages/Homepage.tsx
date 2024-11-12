import { quiz_data } from "../data/data";
import HeroSection from "../components/HeroSection";
import QuizTopic from "../components/QuizTopic";
import Header from "../components/Header";
const HomePage = () => {
    const quiz_topics = quiz_data.quizzes;
    return (
        <div>
            <div className="font-manrope    w-full mb-4 ">
            <Header />
            </div>
            <section className="bg-white font-inter">
                <HeroSection />
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
                            <QuizTopic key={index} quiz={quiz} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
