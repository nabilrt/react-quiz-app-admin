import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { getAllTestimonials, updateTestimonialStatus } from "../lib/api";
import { IoCheckmarkDoneCircleOutline } from "react-icons/io5";
import { MdErrorOutline } from "react-icons/md";

interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

interface Testimonial {
    _id: string;
    userId: User;
    text: string;
    rating: number;
    status: boolean;
    createdAt: string;
}

const Testimonial: React.FC = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<{
        type: "success" | "error";
        text: string;
    } | null>(null);

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            try {
                const response = await getAllTestimonials();
                setTestimonials(response.data.allTestimonials);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTestimonials();
    }, []);

    const handleToggleStatus = async (
        testimonialId: string,
        currentStatus: boolean
    ) => {
        try {
            await updateTestimonialStatus(testimonialId);
            setTestimonials((prevTestimonials) =>
                prevTestimonials.map((testimonial) =>
                    testimonial._id === testimonialId
                        ? { ...testimonial, status: !currentStatus }
                        : testimonial
                )
            );
            showMessage("success", "Status updated successfully!");
        } catch (error) {
            console.error("Error updating testimonial status:", error);
            showMessage("error", "Failed to update status.");
        }
    };

    const showMessage = (type: "success" | "error", text: string) => {
        setMessage({ type, text });
        setTimeout(() => {
            setMessage(null);
        }, 2000);
    };

    return (
        <div className="mt-4">
            {loading ? (
                <p>Loading testimonials...</p>
            ) : testimonials.length > 0 ? (
                <>
                    <h2 className="mb-2 font-manrope text-xl font-semibold">
                        Testimonials
                    </h2>
                    {message && (
                        <div
                            className={`p-3 flex items-center gap-3 rounded mb-4 ${
                                message.type === "success"
                                    ? "bg-[#edf7ed]"
                                    : "bg-[#fdeded]"
                            }`}
                        >
                            {message.type === "success" ? (
                                <IoCheckmarkDoneCircleOutline className="text-[#418944] " />
                            ) : (
                                <MdErrorOutline className="text-[#d74242] " />
                            )}
                            <p
                                className={`${
                                    message.type === "success"
                                        ? "text-[#418944] "
                                        : "text-[#d74242] "
                                }`}
                            >
                                {message.text}
                            </p>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Rating
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Description
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Status
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {testimonials.map((testimonial) => (
                                                <tr key={testimonial._id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="flex-shrink-0 h-10 w-10">
                                                                <img
                                                                    className="w-9 h-10 rounded-md"
                                                                    src={
                                                                        testimonial
                                                                            .userId
                                                                            .avatar
                                                                    }
                                                                    alt={
                                                                        testimonial
                                                                            .userId
                                                                            .name
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="ml-4">
                                                                <div className="text-sm font-medium text-gray-900">
                                                                    {
                                                                        testimonial
                                                                            .userId
                                                                            .name
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            {[
                                                                ...Array(
                                                                    testimonial.rating
                                                                ),
                                                            ].map(
                                                                (_, index) => (
                                                                    <FaStar
                                                                        key={
                                                                            index
                                                                        }
                                                                        size={
                                                                            24
                                                                        }
                                                                        className="text-yellow-400"
                                                                    />
                                                                )
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        {testimonial.text}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                        <div
                                                            className={`w-[55px] h-[30px] py-[0.100rem] px-[0.200rem] border transition-colors duration-500 rounded-lg relative ${
                                                                testimonial.status
                                                                    ? "bg-[#3B9DF8]"
                                                                    : "bg-[#f0f0f0]"
                                                            }`}
                                                        >
                                                            <div
                                                                className={`w-[23px] h-[25px] transition-all duration-500 rounded-md cursor-pointer bg-white ${
                                                                    testimonial.status
                                                                        ? "translate-x-[24px]"
                                                                        : "translate-x-[0px]"
                                                                }`}
                                                                style={{
                                                                    boxShadow:
                                                                        "1px 2px 5px 2px rgb(0,0,0,0.1)",
                                                                }}
                                                                onClick={() =>
                                                                    handleToggleStatus(
                                                                        testimonial._id,
                                                                        testimonial.status
                                                                    )
                                                                }
                                                            ></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>No testimonials available.</p>
            )}
        </div>
    );
};

export default Testimonial;
