import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/formatDate";
import { debounce } from "lodash";
import handleError from "../../services/errorHandler";
import { toggleLike } from "../../services/articleService";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface ArticleProps {
  article: ArticleModel;
}

const Article: FC<ArticleProps> = ({ article }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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
    setIsLiked((prev) => !prev);
    setNumberOfLikes((prev) => (isLiked ? prev - 1 : prev + 1));
    debouncedToggleLike();
  };

  const goToUserPage = () => {
    navigate(`/user/${article.user}`);
  };

  return (
    <div className="bg-white dark:bg-primaryDark2 p-6 rounded-md shadow-md ">
      <div className="flex items-center justify-between gap-8  my-6">
        <div className="">
          <h1 className="font-bold text-2xl text-wrap">{article.title}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-300">
            {DateFormatter.formatDate(article.publishedAt)}
          </p>
        </div>
        <div
          className="flex items-center gap-2 cursor-pointer group "
          onClick={goToUserPage}
        >
          <img
            src={article.userImageUrl}
            alt={`${article.firstName} ${article.lastName} komentarz`}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col text-sm">
            <div className="flex ">
              <p>{article.firstName}</p>
              <p>{article.lastName}</p>
            </div>
            <p className="text-blue-600 text-xs group-hover:font-bold transition-all">
              {article.user}
            </p>
          </div>
        </div>
      </div>
      <p className="leading-10 mb-6 text-justify">{article.content}</p>

      <div className="flex items-center gap-2 ">
        <button
          onClick={toggleLikeHandler}
          className="active:animate-ping transition-all"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className="text-sm">{numberOfLikes}</p>
      </div>
    </div>
  );
};

export default Article;
