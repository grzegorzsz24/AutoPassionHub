import { FC, ReactNode } from "react";

interface PrimaryButtonProps {
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "blue" | "red" | "green" | "yellow";
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
  let buttonClasses =
    "rounded-md text-blue-50 font-semibold shadow-md hover:bg-blue-700 transition-all ${sizeClasses} disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  switch (size) {
    case "xs":
      buttonClasses += " py-1 px-2 text-xs";
      break;
    case "sm":
      buttonClasses += " py-1 px-2 text-sm";
      break;
    case "lg":
      buttonClasses += " py-2 px-8 text-xl";
      break;
    default:
      buttonClasses += " py-2 px-4 text-md";
  }

  switch (color) {
    case "red":
      buttonClasses += " bg-red-600 hover:bg-red-700 ";
      break;
    case "green":
      buttonClasses += " bg-green-600 hover:bg-green-700 ";
      break;
    case "yellow":
      buttonClasses += " bg-yellow-500 hover:bg-yellow-600 ";
      break;
    default:
      buttonClasses += " bg-blue-600 hover:bg-blue-700 ";
  }

  if (fullWidth) {
    buttonClasses += " w-full";
  }

  if (type === "submit") {
    return (
      <button className={buttonClasses} disabled={disabled} type={type}>
        {children}
      </button>
    );
  }

  return (
    <button
      onClick={onClickMethod}
      className={buttonClasses}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
