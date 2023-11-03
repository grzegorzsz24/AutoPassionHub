import { FC, ReactNode } from "react";

interface PrimaryButtonProps {
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "blue" | "red" | "green";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  onClick: onClickMethod,
  size = "md",
  fullWidth = false,
  children,
  disabled = false,
  type = "button",
  color = "blue",
}) => {
  let sizeClasses: string;

  switch (size) {
    case "xs":
      sizeClasses = "py-1 px-2 text-xs";
      break;
    case "sm":
      sizeClasses = "py-1 px-2 text-sm";
      break;
    case "lg":
      sizeClasses = "py-2 px-8 text-xl";
      break;
    default:
      sizeClasses = "py-2 px-4 text-md";
  }

  switch (color) {
    case "red":
      sizeClasses += " bg-red-600 hover:bg-red-700 ";
      break;
    case "green":
      sizeClasses += " bg-green-600 hover:bg-green-700 ";
      break;
    default:
      sizeClasses += " bg-blue-600 hover:bg-blue-700 ";
  }

  if (fullWidth) {
    sizeClasses += " w-full";
  }

  if (type === "submit") {
    return (
      <button
        className={` rounded-md text-blue-50 font-semibold shadow-md hover:bg-blue-700 transition-all ${sizeClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClickMethod}
      className={` rounded-md text-blue-50 font-semibold shadow-md hover:bg-blue-700 transition-all ${sizeClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
