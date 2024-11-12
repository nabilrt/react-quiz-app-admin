import { useAuth } from "../lib/context/auth-context";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { updateUser, uploadAvatarForUser, userDetails } from "../lib/api/index";

const ProfilePage = () => {
    const { user, setUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: user?.name
                ? user.name.split(" ").slice(0, 2).join(" ")
                : "",
            last_name: user?.name
                ? user.name.split(" ").slice(2).join(" ")
                : "",
            email: user?.email || "",
            role: user?.role || "",
        },
    });
    const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: any) => {
        try {
            setLoading(true);
            await updateUser({ name: data.first_name + " " + data.last_name });
            // Fetch updated user details and update the context
            const userData = await userDetails();
            setUser(userData.data.user);
            localStorage.setItem("user", JSON.stringify(userData.data.user));
        } catch (error: any) {
            console.error("Error uploading avatar:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleImageChange = async (event: any) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            try {
                setLoading(true);
                await uploadAvatarForUser(formData);
                // Fetch updated user details and update the context
                const userData = await userDetails();
                setUser(userData.data.user);
                localStorage.setItem(
                    "user",
                    JSON.stringify(userData.data.user)
                );
                setAvatar(userData.data.user.avatar);
            } catch (error: any) {
                console.error("Error uploading avatar:", error.message);
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="bg-white w-full flex flex-col gap-5 px-3 md:px-16 lg:px-28 md:flex-row text-[#161931]">
            <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
                <div className="p-2 md:p-4">
                    <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl">
                            Public Profile
                        </h2>
                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={avatar!}
                                    alt="User avatar"
                                />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <label
                                        htmlFor="avatar-upload"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] disabled:bg-slate-300 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        {loading
                                            ? "Please wait..."
                                            : "Change Picture"}
                                    </label>
                                    <input
                                        type="file"
                                        id="avatar-upload"
                                        className="hidden"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </div>
                            </div>
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="mt-8 sm:mt-14 text-[#202142]"
                            >
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label
                                            htmlFor="first_name"
                                            className="block mb-2 text-sm font-medium text-indigo-900 "
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="first_name"
                                            className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                            placeholder="Your first name"
                                            {...register("first_name", {
                                                required: true,
                                            })}
                                        />
                                        {errors.first_name && (
                                            <span className="text-red-500 text-sm">
                                                First name is required
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-indigo-900 "
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 read-only:bg-slate-200 read-only:cursor-default"
                                        placeholder="your.email@mail.com"
                                        readOnly
                                        {...register("email", {
                                            required: true,
                                        })}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">
                                            Email is required
                                        </span>
                                    )}
                                </div>
                                <div className="mb-2 sm:mb-6">
                                    <label
                                        htmlFor="role"
                                        className="block mb-2 text-sm font-medium text-indigo-900 "
                                    >
                                        ROLE
                                    </label>
                                    <input
                                        type="text"
                                        id="role"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 uppercase read-only:bg-slate-200 read-only:cursor-default"
                                        placeholder="your role"
                                        {...register("role")}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center disabled:bg-slate-200 "
                                        disabled={loading}
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfilePage;
