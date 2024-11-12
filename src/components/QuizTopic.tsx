import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import { TiEdit } from "react-icons/ti";
import { Quiz } from "../data/types";

interface QuizCardProps {
    quiz: Quiz;
    onEdit: (quiz: Quiz) => void; // Pass the quiz data to open modal in edit mode
}

const QuizTopic: React.FC<QuizCardProps> = ({ quiz, onEdit }) => {
    return (
        <div className="relative bg-white shadow-md rounded-xl">
            {/* Edit icon at the top-right corner */}
            <div className="absolute top-2 right-2">
                <button
                    className="p-1 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full"
                    onClick={() => onEdit(quiz)} // Pass quiz data to the parent component
                >
                    <TiEdit className="text-[1.2rem]" />
                </button>
            </div>

            <img
                src={quiz.logo}
                alt={`${quiz.topic} logo`}
                className="w-full h-[100px] object-contain rounded-t-xl"
            />
            <div className="p-4">
                <h1 className="text-[1.3rem] font-bold leading-[34px]">
                    {quiz.topic}
                </h1>
                <p className="text-[0.9rem] text-gray-400">{quiz.info}</p>
            </div>
            <Link
                to={`/user/quiz/${quiz.topic}`}
                className="float-right p-2 hover:bg-gray-100 cursor-pointer mr-2 mb-2 rounded-full group"
            >
                <BsArrowRight className="text-[1.5rem] text-gray-400" />
            </Link>
        </div>
    );
};

export default QuizTopic;
