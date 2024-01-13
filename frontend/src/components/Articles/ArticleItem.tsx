import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  toggleLike,
  toogleArticleBookmark,
} from "../../services/articleService";

import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/DateFormatter";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

interface ForumItemProps {
  article: ArticleModel;
}

const ArticleItem: FC<ForumItemProps> = ({ article }) => {
  const {
    showErrorNotification,
    showInfoNotification,
    showSuccessNotification,
  } = useNotification();
  const navigate = useNavigate();
  const navigateToArticlePage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((event.target as HTMLElement).closest("button")) {
      event.stopPropagation();
      return;
    }
    navigate(`/articles/${article.id}`);
  };
  const [isBookmarked, setIsBookmarked] = useState<boolean>(article.saved);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    article.likesNumber,
  );
  const [isLiked, setIsLiked] = useState<boolean>(article.liked);

  const debouncedToggleLike = debounce(async () => {
    try {
      const data = await toggleLike(article.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
    } catch (error) {
      showErrorNotification(error);
      setIsLiked((prev) => !prev);
      setNumberOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  }, 500);

  const toggleLikeHandler = () => {
    setIsLiked((prev) => !prev);
    setNumberOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    debouncedToggleLike();
  };

  const toogleBookmarkHandler = async () => {
    try {
      const data = await toogleArticleBookmark(article.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (isBookmarked) {
        showInfoNotification("Usunięto z zapisanych");
      } else {
        showSuccessNotification("Dodano do zapisanych");
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      showErrorNotification(error);
    }
  };
  return (
    <div
      className="flex cursor-pointer flex-col justify-between gap-4 rounded-md bg-white p-4  shadow-md dark:bg-primaryDark2 sm:flex-row sm:gap-12"
      onClick={(event) => navigateToArticlePage(event)}
    >
      <div>
        <p className="text-xl font-bold ">{article.title}</p>
        <div className="flex items-center gap-4 text-sm ">
          <p>
            {article.firstName} {article.lastName}
          </p>
          <RiArrowRightDoubleFill />
          <p className=" font-semibold text-blue-600">
            {DateFormatter.formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
      <div className="mr-16 flex items-center gap-8">
        <button
          className="flex items-center gap-2 transition-all hover:text-blue-600 active:animate-ping"
          onClick={toggleLikeHandler}
        >
          <p className="font-bold">{numberOfLikes}</p>
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <ToogleBookmarkButton
          isBookmarked={isBookmarked}
          onClick={toogleBookmarkHandler}
          size="small"
        />
      </div>
    </div>
  );
};

export default ArticleItem;
