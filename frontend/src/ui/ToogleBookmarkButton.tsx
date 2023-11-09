import { FaBookmark, FaRegBookmark } from "react-icons/fa";

import { FC } from "react";

interface ToogleBookmarkButtonProps {
  isBookmarked: boolean;
  onClick: () => void;
  size?: "small" | "medium" | "large";
}

const ToogleBookmarkButton: FC<ToogleBookmarkButtonProps> = ({
  isBookmarked,
  onClick,
  size = "medium",
}) => {
  let classes = "hover:text-blue-600 active:animate-ping transition-all p-1";

  switch (size) {
    case "small":
      classes += " text-md";
      break;
    case "medium":
      classes += " text-xl";
      break;
    case "large":
      classes += " text-2xl";
      break;
  }

  return (
    <button onClick={onClick} className={classes}>
      {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </button>
  );
};

export default ToogleBookmarkButton;
