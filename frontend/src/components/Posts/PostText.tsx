import { FC } from "react";

interface PostTextProps {
  text: string;
}

const PostText: FC<PostTextProps> = ({ text }) => {
  return (
    <div
      style={{ overflowWrap: "anywhere" }}
      className="px-4 py-4 text-justify"
    >
      {text}
    </div>
  );
};

export default PostText;
