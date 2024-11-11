import { useRef, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

const Register = () => {
    let navigate = useNavigate();

    const [imageLink, setImageLink] = useState<string>("");
    const fileRef = useRef<HTMLInputElement | null>(null);

    const handleUploadImageClick = () => {
        fileRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files?.[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setImageLink(imageURL);
        }
    };

    return (
        <div>
            <div className="font-manrope  shadow-[0px_12px_6px_0px_rgba(0,_0,_0,_0.1)]  w-full mb-4 h-28">
                <div className=" -mt-8  flex justify-between mx-auto max-w-screen-2xl sm:py-16 lg:px-6 ">
                    <div>
                        <p
                            className="font-semibold text-xl tracking-wider cursor-pointer"
                            onClick={() => navigate("/")}
                        >
                            Quizzy Authentication
                        </p>
                    </div>
                </div>
            </div>

            <div className="font-inter container mx-auto py-8 px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                    Registration Form
                </h1>
                <form className="w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto bg-white p-8 rounded-md shadow-md">
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm md:text-base font-bold mb-2"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm md:text-base font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@example.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm md:text-base font-bold mb-2"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            className="block text-gray-700 text-sm md:text-base font-bold mb-2"
                            htmlFor="confirm-password"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                            type="password"
                            id="confirm-password"
                            name="confirm-password"
                            placeholder="********"
                        />
                        <input
                            type="file"
                            name="image"
                            ref={fileRef}
                            id="fourthImage"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <div className="flex flex-col sm:flex-row gap-2 mt-4 justify-center items-center">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full border border-[#e5eaf2] flex items-center justify-center">
                                {imageLink === "" ? (
                                    <CgProfile className="text-6xl sm:text-8xl md:text-9xl text-[#e5eaf2]" />
                                ) : (
                                    <img
                                        src={imageLink}
                                        alt="profile"
                                        className="w-full h-full object-cover rounded-full"
                                    />
                                )}
                            </div>

                            <button
                                type="button"
                                className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded-md mt-4 sm:mt-0 sm:ml-4"
                                onClick={handleUploadImageClick}
                            >
                                Upload profile
                            </button>
                        </div>
                    </div>
                    <button
                        className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                        type="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
