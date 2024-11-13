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

export const addCategoryToQuiz = async (id: string | undefined, data: any) => {
    try {
        const response = await axios.post(`/quiz/${id}/category`, data);
        return response;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
