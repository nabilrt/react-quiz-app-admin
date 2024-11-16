import axios from "../config/axios";

export const loginUser = async (data: { email: string; password: string }) => {
    try {
        const response = await axios.post("/user/login", data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const userDetails = async () => {
    try {
        const response = await axios.get("/user/admin");
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const uploadAvatarForUser = async (data: any) => {
    try {
        const response = await axios.post("/user/admin/upload", data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateUser = async (data: any) => {
    try {
        const response = await axios.post("/user/admin/update", data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateUserPassword = async (data: any) => {
    try {
        const response = await axios.post("/user/admin/update-password", data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllQuizzes = async () => {
    try {
        const response = await axios.get("/quiz/all-quiz");
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getQuizByTopic = async (topic: any) => {
    try {
        const response = await axios.get(`/quiz/topic/${topic}`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAdminAnalytics = async () => {
    try {
        const response = await axios.get(`/quiz-record/admin/analytics`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const createQuiz = async (data: any) => {
    try {
        const response = await axios.post(`/quiz/add`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
export const updateQuiz = async (id: string | undefined, data: any) => {
    try {
        const response = await axios.post(`/quiz/update/${id}`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateCategoryToQuiz = async (
    id: string | undefined,
    category_id: string | undefined,
    data: any
) => {
    try {
        const response = await axios.post(`/quiz/${id}/${category_id}`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateQuestinsToQuiz = async (
    id: string | undefined,
    category_id: string | undefined,
    data: any
) => {
    try {
        const response = await axios.put(`/quiz/${id}/${category_id}`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getQuestionsForQuiz = async (
    id: string | undefined,
    category_id: string | undefined
) => {
    try {
        const response = await axios.get(`/quiz/${id}/${category_id}`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const addCategoryToQuiz = async (id: string | undefined, data: any) => {
    try {
        const response = await axios.post(`/quiz/${id}/category`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteQuiz = async (id: string | undefined) => {
    try {
        const response = await axios.delete(`/quiz/${id}`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteQuizCategory = async (
    id: string | undefined,
    category_id: string | undefined
) => {
    try {
        const response = await axios.delete(`/quiz/${id}/${category_id}`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const showAllIssues = async () => {
    try {
        const response = await axios.get(`/issue/all`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateIssueStatus = async (id: string | undefined, data: any) => {
    try {
        const response = await axios.put(`/issue/${id}`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllTestimonials = async () => {
    try {
        const response = await axios.get(`/testimonial/all`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const updateTestimonialStatus = async (t_id: string | undefined) => {
    try {
        const response = await axios.put(`/testimonial/${t_id}`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const clearCommunityChat = async () => {
    try {
        const response = await axios.delete(`/chat/clear-messages`);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
