import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/context/auth-context";

const NotFoundPage = () => {
    let navigate = useNavigate();
    const { authenticated } = useAuth();
    return (
        <div className="boxShadow px-10 w-full flex items-center flex-col justify-center pb-[50px] rounded-xl">
            <img
                src="https://i.ibb.co/nP1Cngw/Error-Server-1.png"
                alt="illustration"
                className="w-full lg:w-[500px]"
            />
            <h1 className="text-[#1C3177] text-[1.8rem] sm:text-[2.5rem] font-[800] mt-3 w-full lg:w-[55%] text-center">
                Thunder 404{" "}
            </h1>

            <button
                className="py-3 px-6 sm:px-8 rounded-full bg-[#fff] text-[#1C3177] border border-[#1C3177] mt-4 flex items-center gap-[10px]"
                onClick={() => {
                    authenticated ? navigate("/admin/dashboard") : navigate("/");
                }}
            >
                <FaArrowLeftLong /> Back to home
            </button>
        </div>
    );
};

export default NotFoundPage;
