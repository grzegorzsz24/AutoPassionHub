import { FC } from "react";

interface PostTextProps {
  text: string;
}

const PostText: FC<PostTextProps> = ({ text }) => {
  return (
    <div
      style={{ overflowWrap: "anywhere" }}
      className="sm:text-md px-2 py-2 text-justify text-sm sm:px-4 sm:py-4 xl:text-lg"
    >
      {text}
    </div>
  );
};

export default PostText;
