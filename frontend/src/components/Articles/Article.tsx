import { FC, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/DateFormatter";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import { debounce } from "lodash";
import { toggleLike } from "../../services/articleService";
import { toogleArticleBookmark } from "../../services/articleService";
import { useAppSelector } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";
import { useStompClient } from "react-stomp-hooks";

interface ArticleProps {
  article: ArticleModel;
}

const Article: FC<ArticleProps> = ({ article }) => {
  const stompClient = useStompClient();
  const {
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
  } = useNotification();
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);

  const navigate = useNavigate();
  const [numberOfLikes, setNumberOfLikes] = useState<number>(
    article.likesNumber,
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(article.saved);
  const [isLiked, setIsLiked] = useState<boolean>(article.liked);

  const debouncedToggleLike = debounce(async () => {
    try {
      const data = await toggleLike(article.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (
        stompClient &&
        isLiked === false &&
        article.userId !== Number(loggedInUserId)
      ) {
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

  const goToUserPage = () => {
    navigate(`/user/${article.user}`);
  };

  return (
    <div className="rounded-md bg-white p-6 shadow-md dark:bg-primaryDark2 ">
      <div className="my-6 flex items-center justify-between  gap-8">
        <div className="">
          <h1 className="text-wrap text-2xl font-bold">{article.title}</h1>
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-300">
            {DateFormatter.formatDate(article.publishedAt)}
          </p>
          <ToogleBookmarkButton
            isBookmarked={isBookmarked}
            onClick={toogleBookmarkHandler}
            size="large"
          />
        </div>
        <div
          className="group flex cursor-pointer items-center gap-2 "
          onClick={goToUserPage}
        >
          <img
            src={article.userImageUrl}
            alt={`${article.firstName} ${article.lastName} komentarz`}
            className="h-8 w-8 rounded-full"
          />
          <div className="flex flex-col text-sm">
            <div className="flex ">
              <p>{article.firstName}</p>
              <p>{article.lastName}</p>
            </div>
            <p className="text-xs text-blue-600 transition-all group-hover:font-bold">
              {article.user}
            </p>
          </div>
        </div>
      </div>
      <p className="mb-6 text-justify leading-10">{article.content}</p>

      <div className="flex items-center gap-2 ">
        <button
          onClick={toggleLikeHandler}
          className="transition-all hover:text-blue-600 active:animate-ping"
        >
          {isLiked ? <FaHeart /> : <FaRegHeart />}
        </button>
        <p className="text-sm">{numberOfLikes}</p>
      </div>
    </div>
  );
};

export default Article;
