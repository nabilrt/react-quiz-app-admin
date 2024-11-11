import React from "react";

type QuizHeaderProps = {
    lang: string | undefined;
};

const QuizHeader: React.FC<QuizHeaderProps> = ({ lang }) => {
    return (
        <div className="font-manrope p-4 flex justify-center items-center shadow-[0px_12px_6px_0px_rgba(0,_0,_0,_0.1)] h-20 w-full mb-4">
            <p className="font-semibold tracking-wider uppercase">
                {lang} Quiz Portal
            </p>
        </div>
    );
};

export default QuizHeader;
