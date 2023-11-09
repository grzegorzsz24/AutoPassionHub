import { FC, ReactNode } from "react";

interface OutlineButtonProps {
  onClick: () => void;
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  color?: "blue" | "red" | "green";
}

const OutlineButton: FC<OutlineButtonProps> = ({
  onClick: onClickMethod,
  size = "md",
  fullWidth = false,
  children,
  disabled = false,
  type = "button",
  color = "blue",
}) => {
  let buttonClasses =
    "border-2 font-semibold  transition-all shadow-md rounded-md flex items-center justify-center gap-2";

  switch (size) {
    case "xs":
      buttonClasses += " py-1 px-2 text-xs";
      break;
    case "sm":
      buttonClasses += " py-1 px-2 text-sm";
      break;
    case "lg":
      buttonClasses += " py-2 px-16 text-xl";
      break;
    default:
      buttonClasses += " py-2 px-4 text-lg";
  }

  switch (color) {
    case "red":
      buttonClasses +=
        " border-red-600 text-red-600 hover:bg-red-600 hover:text-red-50   transition-all";
      break;
    case "green":
      buttonClasses +=
        " border-green-600 text-green-600 hover:bg-green-600 hover:text-green-50  transition-all";
      break;
    default:
      buttonClasses +=
        " border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-blue-50 transition-all";
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

export default OutlineButton;
