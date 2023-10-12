import { FC, ReactNode } from "react";

interface OutlineButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
}

const OutlineButton: FC<OutlineButtonProps> = ({
  onClick: onClickMethod,
  size = "md",
  fullWidth = false,
  children,
  disabled = false,
}) => {
  let sizeClasses: string;

  switch (size) {
    case "sm":
      sizeClasses = "py-1 px-2 text-sm";
      break;
    case "lg":
      sizeClasses = "py-2 px-16 text-xl";
      break;
    default:
      sizeClasses = "py-2 px-4 text-lg";
  }

  if (fullWidth) {
    sizeClasses += " w-full";
  }

  return (
    <button
      onClick={onClickMethod}
      className={`border-2 border-blue-600 text-blue-600 font-semibold dark:border-blue-50 dark:text-blue-50 hover:bg-blue-600 hover:text-blue-50 dark:hover:bg-blue-50 dark:hover:text-blue-600 transition-all shadow-md rounded-md ${sizeClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
