import { FC, ReactNode } from "react";

interface PrimaryButtonProps {
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
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
      sizeClasses = "py-2 px-8 text-xl";
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
      className={`bg-blue-600 rounded-md text-blue-50 font-semibold shadow-md hover:bg-blue-700 transition-all ${sizeClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
