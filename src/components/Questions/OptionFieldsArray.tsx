import { Controller, useFieldArray } from "react-hook-form";
import { IoAddCircleOutline } from "react-icons/io5";
import { RiDeleteBin5Line } from "react-icons/ri";
type Option = {
    answer: string;
};
const OptionsFieldArray: React.FC<{
    control: any;
    questionIndex: number;
    options: Option[];
}> = ({ control, questionIndex }) => {
    const {
        fields: optionFields,
        append: appendOption,
        remove: removeOption,
    } = useFieldArray({
        control,
        name: `questions.${questionIndex}.options`,
    });

    return (
        <div className="space-y-2">
            {optionFields.map((optionField, optionIndex) => (
                <div key={optionField.id} className="flex items-center gap-2">
                    <Controller
                        name={`questions.${questionIndex}.options.${optionIndex}.answer`}
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder={`Option ${optionIndex + 1}`}
                                className="border-[#e5eaf2] border rounded-md outline-none px-4 w-full mt-1 py-3 focus:border-[#3B9DF8] transition-colors duration-300"
                                required
                            />
                        )}
                    />
                    {optionFields.length > 2 && (
                        <button
                            type="button"
                            onClick={() => removeOption(optionIndex)}
                            className="text-red-500"
                        >
                            <RiDeleteBin5Line />
                        </button>
                    )}
                </div>
            ))}
            {optionFields.length < 8 && (
                <button
                    type="button"
                    onClick={() => appendOption({ answer: "" })}
                    className="flex items-center gap-1 text-green-500 mt-2"
                >
                    <IoAddCircleOutline />
                    <span>Add Option</span>
                </button>
            )}
        </div>
    );
};

export default OptionsFieldArray;
