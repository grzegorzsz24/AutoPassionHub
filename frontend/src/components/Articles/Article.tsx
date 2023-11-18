import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/DateFormatter";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import { debounce } from "lodash";
import handleError from "../../services/errorHandler";
import { toggleLike } from "../../services/articleService";
import { toogleArticleBookmark } from "../../services/articleService";
import { useNavigate } from "react-router-dom";
import { useStompClient } from "react-stomp-hooks";

interface ArticleProps {
  article: ArticleModel;
}

const Article: FC<ArticleProps> = ({ article }) => {
  const stompClient = useStompClient();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    article.likesNumber
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(article.saved);
  const [isLiked, setIsLiked] = useState<boolean>(article.liked);

  const debouncedToggleLike = debounce(async () => {
    try {
      const data = await toggleLike(article.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (stompClient && isLiked === false) {
        stompClient.publish({
          destination: `/app/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: article.userId,
            content: "Użytkownik polubił twój artykuł",
            type: "ARTICLE_LIKE",
            entityId: article.id,
          }),
        });
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

  const goToUserPage = () => {
    navigate(`/user/${article.user}`);
  };

  return (
    <div className="bg-white dark:bg-primaryDark2 p-6 rounded-md shadow-md ">
      <div className="flex items-center justify-between gap-8  my-6">
        <div className="">
          <h1 className="font-bold text-2xl text-wrap">{article.title}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-300 mb-4">
            {DateFormatter.formatDate(article.publishedAt)}
          </p>
          <ToogleBookmarkButton
            isBookmarked={isBookmarked}
            onClick={toogleBookmarkHandler}
            size="large"
          />
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
          className="active:animate-ping transition-all hover:text-blue-600"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className="text-sm">{numberOfLikes}</p>
      </div>
    </div>
  );
};

export default Article;
