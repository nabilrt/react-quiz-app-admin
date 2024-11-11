// Define the types for quiz data
export type Option = {
    answer: string;
};

export type Question = {
    question: string;
    options: Option[];
    answer: string[]; // Array of correct answers
};

export type Category = {
    category: string;
    info: string;
    questions: Question[];
};

export type Quiz = {
    topic: string;
    categories: Category[];
};
