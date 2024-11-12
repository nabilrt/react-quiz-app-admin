import { Link, useLocation } from "react-router-dom";
import loginImage from "../assets/quiz.png";
import { useAuth } from "../lib/context/auth-context";

const AuthSidebar = () => {
    let location = useLocation();
    const { user, logout } = useAuth();
    return (
        <aside className="flex flex-col  h-screen   px-4 py-8 overflow-y-auto bg-white border-r ">
            <a href="#">
                <img className="w-auto h-6 sm:h-7" src={loginImage} alt="" />
            </a>

            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <Link
                        className={`flex items-center px-4 py-2 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100  hover:text-gray-700 ${
                            location.pathname === "/user/dashboard"
                                ? "bg-gray-100"
                                : ""
                        } rounded-md `}
                        to="/user/dashboard"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="mx-4 font-medium">Dashboard</span>
                    </Link>
                    <Link
                        className={`flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md  hover:bg-gray-100 hover:text-gray-700 ${
                            location.pathname.startsWith("/user/quiz")
                                ? "bg-gray-100"
                                : ""
                        }`}
                        to="/user/quiz"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M15 5V7M15 11V13M15 17V19M5 5C3.89543 5 3 5.89543 3 7V10C4.10457 10 5 10.8954 5 12C5 13.1046 4.10457 14 3 14V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V14C19.8954 14 19 13.1046 19 12C19 10.8954 19.8954 10 21 10V7C21 5.89543 20.1046 5 19 5H5Z"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="mx-4 font-medium">Quiz</span>
                    </Link>
                    <Link
                        className={`flex items-center px-4 py-2 text-gray-600 mt-5 transition-colors duration-300 transform rounded-md  hover:bg-gray-100  hover:text-gray-700 ${
                            location.pathname === "/user/settings"
                                ? "bg-gray-100"
                                : ""
                        } rounded-md `}
                        to="/user/settings"
                    >
                        <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                                stroke="currentColor"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="mx-4 font-medium">Settings</span>
                    </Link>
                </nav>
                <div className="flex flex-col gap-2">
                    <Link
                        to="/user/profile"
                        className={`flex items-center px-4 py-2 -mx-2 transform rounded-md  hover:bg-gray-200 hover:text-gray-700 ${
                            location.pathname === "/user/profile"
                                ? "bg-gray-100"
                                : ""
                        }`}
                    >
                        <img
                            className="object-cover mx-2 rounded-full h-9 w-9"
                            src={user?.avatar}
                            alt="avatar"
                        />
                        <span className="mx-2 font-medium text-gray-800 ">
                            {user?.name}
                        </span>
                    </Link>
                    <button
                        onClick={logout}
                        className={`flex items-center px-4 py-2 -mx-2 transform rounded-md  hover:bg-gray-200 hover:text-gray-700`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path d="M16.24 7.75a.75.75 0 0 1 1.06 1.06l-3.72 3.72h8.91a.75.75 0 0 1 0 1.5h-8.91l3.72 3.72a.75.75 0 1 1-1.06 1.06l-5.25-5.25a.75.75 0 0 1 0-1.06l5.25-5.25Z" />
                            <path d="M9.25 3a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-1.5 0V3.75a.75.75 0 0 1 .75-.75Z" />
                        </svg>

                        <span className="mx-2 font-medium text-gray-800 ">
                            Logout
                        </span>
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AuthSidebar;