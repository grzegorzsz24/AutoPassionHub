import { FC, ReactNode } from "react";

interface OutlineButtonProps {
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
  color?: "blue" | "red" | "green";
}

const OutlineButton: FC<OutlineButtonProps> = ({
  onClick: onClickMethod,
  size = "md",
  fullWidth = false,
  children,
  disabled = false,
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
      sizeClasses = "py-2 px-16 text-xl";
      break;
    default:
      sizeClasses = "py-2 px-4 text-lg";
  }

  switch (color) {
    case "red":
      sizeClasses +=
        " border-red-600 text-red-600 hover:bg-red-600 hover:text-red-50   transition-all";
      break;
    case "green":
      sizeClasses +=
        " border-green-600 text-green-600 hover:bg-green-600 hover:text-green-50  transition-all";
      break;
    default:
      sizeClasses +=
        " border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-blue-50 transition-all";
  }

  if (fullWidth) {
    sizeClasses += " w-full";
  }

  return (
    <button
      onClick={onClickMethod}
      className={`border-2 font-semibold  transition-all shadow-md rounded-md ${sizeClasses}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default OutlineButton;
