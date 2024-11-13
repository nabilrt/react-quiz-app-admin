// Define the types for quiz data
export type Option = {
    answer: string;
};

export type Question = {
    _id: string;
    question: string;
    options: Option[];
    answer: string[]; // Array of correct answers
};

export type Category = {
    _id: string;
    category: string;
    info: string;
    questions: Question[];
};

export interface Quiz {
    _id: string;
    topic: string;
    info: string;
    logo: string;
    categories: Category[];
}
