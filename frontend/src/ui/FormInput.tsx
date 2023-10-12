import { ChangeEvent, FC, FocusEvent } from "react";

interface FormInputProps {
  type: string;
  placeholder: string;
  value: string;
  errorMessage: string;
  hasError: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: FocusEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInputProps> = ({
  type,
  placeholder,
  value,
  errorMessage,
  hasError,
  onChange,
  onBlur,
}) => {
  return (
    <div className="w-full">
      <input
        value={value}
        type={type}
        placeholder={placeholder}
        className={`py-2 px-4 text-lg rounded-md w-full shadow-md outline-none focus:ring-4 ring-blue-600 dark:bg-blue-900 dark:text-blue-50 ${
          hasError ? " ring-4 ring-red-600 " : ""
        }}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasError && (
        <span className="text-red-600 font-bold text-sm ml-2">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
