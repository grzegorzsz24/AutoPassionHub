import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import {
  toggleLike,
  toogleArticleBookmark,
} from "../../services/articleService";

import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/DateFormatter";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import { debounce } from "lodash";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface ForumItemProps {
  article: ArticleModel;
}

const ArticleItem: FC<ForumItemProps> = ({ article }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateToArticlePage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((event.target as HTMLElement).closest("button")) {
      event.stopPropagation();
      return;
    }
    navigate(`/articles/${article.id}`);
  };
  const [isBookmarked, setIsBookmarked] = useState<boolean>(article.saved);
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    article.likesNumber
  );
  const [isLiked, setIsLiked] = useState<boolean>(article.liked);

  const debouncedToggleLike = debounce(async () => {
    try {
      const data = await toggleLike(article.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
      setIsLiked((prev) => !prev);
      setNumberOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    }
  }, 500);

  const toggleLikeHandler = () => {
    console.log("xd");
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
        dispatch(
          addNotification({
            type: NotificationStatus.INFO,
            message: "Usunięto z zapisanych",
          })
        );
      } else {
        dispatch(
          addNotification({
            type: NotificationStatus.SUCCESS,
            message: "Dodano do zapisanych",
          })
        );
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };
  return (
    <div
      className="p-4 bg-white dark:bg-primaryDark2 rounded-md flex  justify-between gap-12 cursor-pointer shadow-md"
      onClick={(event) => navigateToArticlePage(event)}
    >
      <div>
        <p className="font-bold text-xl ">{article.title}</p>
        <div className="flex gap-4 items-center text-sm ">
          <p>
            {article.firstName} {article.lastName}
          </p>
          <RiArrowRightDoubleFill />
          <p className=" font-semibold text-blue-600">
            {DateFormatter.formatDate(article.publishedAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-8 mr-16">
        <button
          className="flex items-center gap-2 active:animate-ping transition-all hover:text-blue-600"
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
