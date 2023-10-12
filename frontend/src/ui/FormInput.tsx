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
        className={`py-2 px-4 text-lg rounded-md w-full shadow-md outline-none focus:ring-2 ring-blue-600 text-primaryDark ${
          hasError ? " ring-2 ring-red-600 " : ""
        }}`}
        onChange={onChange}
        onBlur={onBlur}
      />
      {hasError && (
        <span className="text-red-600 font-semibold text-sm ml-2 mt-2 block">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default FormInput;
