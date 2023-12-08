import { FC } from "react";

interface PostTextProps {
  text: string;
}

const PostText: FC<PostTextProps> = ({ text }) => {
  return (
    <div
      style={{ overflowWrap: "anywhere" }}
      className="px-2 sm:px-4 py-2 sm:py-4 text-justify text-sm sm:text-md xl:text-lg"
    >
      {text}
    </div>
  );
};

export default PostText;
