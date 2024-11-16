import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { clearCommunityChat, updateUserPassword } from "../lib/api/index";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

interface FormValues {
    new_password: string;
    confirm_password: string;
}

const SettingsPage: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [clearLoading, setClearLoading] = useState<boolean>(false);
    const [clearError, setClearError] = useState<string | null>(null);
    const [clearSuccess, setClearSuccess] = useState<string | null>(null);

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setError(null); // Clear previous errors
        setLoading(true); // Start loading

        // Check if passwords match
        if (data.new_password !== data.confirm_password) {
            setError("Passwords do not match.");
            setLoading(false);
            return;
        }

        try {
            // Send password update request
            await updateUserPassword({ password: data.new_password });
            setSuccess("Password updated successfully!");
            setTimeout(() => {
                setSuccess(null);
            }, 2000);
            reset(); // Reset form fields
        } catch (error) {
            setError("Failed to update password. Please try again.");
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const handleClearChat = async () => {
        setClearError(null); // Clear previous errors
        setClearLoading(true); // Start loading

        try {
            // Call the API to clear the chat
            await clearCommunityChat();
            setClearSuccess("Community chat cleared successfully!");
            setTimeout(() => {
                setClearSuccess(null);
            }, 2000);
        } catch (error) {
            setClearError("Failed to clear community chat. Please try again.");
        } finally {
            setClearLoading(false); // Stop loading
        }
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className=" text-2xl font-bold sm:text-xl">
                            Change Password
                        </h2>
                        <small>Update your password here</small>
                        <div className="grid max-w-2xl mx-auto mt-2">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="mt-8 sm:mt-14 text-[#202142]"
                            >
                                {error && (
                                    <p className="text-red-500 text-sm mb-4">
                                        {error}
                                    </p>
                                )}
                                {success && (
                                    <p className="text-emerald-600 text-sm mb-4">
                                        {success}
                                    </p>
                                )}

                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-indigo-900"
                                    >
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        {...register("new_password", {
                                            required: "Password is required",
                                        })}
                                    />
                                    {errors.new_password && (
                                        <span className="text-red-500 text-sm">
                                            {errors.new_password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="confirm_password"
                                        className="block mb-2 text-sm font-medium text-indigo-900"
                                    >
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        id="confirm_password"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        {...register("confirm_password", {
                                            required:
                                                "Please confirm your password",
                                        })}
                                    />
                                    {errors.confirm_password && (
                                        <span className="text-red-500 text-sm">
                                            {errors.confirm_password.message}
                                        </span>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-slate-200"
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className=" text-2xl font-bold sm:text-xl">
                            Clear Community Chat
                        </h2>
                        <small>
                            Clear the community chats by clicking below. Note
                            that people might having conversation now. It is
                            safe to clear it in an ideal time like night.
                        </small>
                        <div className="mt-4">
                            <button
                                onClick={handleClearChat}
                                className="px-6 py-2 border border-indigo-700 font-semibold text-sm bg-indigo-700
                                text-[#ffffff] hover:bg-[#ffffff] hover:text-indigo-700 transition duration-300 rounded-md"
                                disabled={clearLoading}
                            >
                                {clearLoading ? "Clearing..." : "Clear"}
                            </button>
                        </div>
                        <div className="mt-4">
                            {clearError && (
                                <div className="p-3 flex items-center gap-3 bg-[#fdeded] rounded">
                                    <MdErrorOutline className="text-[#d74242] " />
                                    <p className="text-[#d74242] ">
                                        {clearError}
                                    </p>
                                </div>
                            )}
                            {clearSuccess && (
                                <div className=" p-3 flex items-center gap-3 bg-[#edf7ed] rounded">
                                    <IoCheckmarkDoneCircleOutline className="text-[#418944] " />
                                    <p className="text-[#418944] ">
                                        {clearSuccess}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
