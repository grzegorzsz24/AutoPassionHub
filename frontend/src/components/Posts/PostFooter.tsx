import { FaHeart, FaRegComment, FaRegHeart } from "react-icons/fa";

import { FC } from "react";

interface PostFooterProps {
  liked: boolean;
  likes: number;
  comments: number;
  toogleLikeHandler: () => void;
  toogleCommentsVisibilityHandler: () => void;
}

const PostFooter: FC<PostFooterProps> = ({
  liked,
  likes,
  comments,
  toogleLikeHandler,
  toogleCommentsVisibilityHandler,
}) => {
  return (
    <div className="flex gap-4 px-2 py-2 text-blue-700 dark:text-blue-200 sm:gap-8 sm:px-4 sm:py-4">
      <div className="flex items-center gap-2 ">
        <button
          onClick={toogleLikeHandler}
          className="transition-all active:animate-ping"
        >
          {" "}
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className="text-sm">{likes}</p>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toogleCommentsVisibilityHandler}>
          {" "}
          <FaRegComment />
        </button>
        <p className="text-sm">{comments}</p>
      </div>
    </div>
  );
};

export default PostFooter;
