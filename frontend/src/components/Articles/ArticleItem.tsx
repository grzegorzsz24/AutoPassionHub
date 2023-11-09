import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/DateFormatter";
import { FC } from "react";
import { FaHeart } from "react-icons/fa";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface ForumItemProps {
  article: ArticleModel;
}

const ArticleItem: FC<ForumItemProps> = ({ article }) => {
  const navigate = useNavigate();
  const navigateToForumPage = () => {
    navigate(`/articles/${article.id}`);
  };

  return (
    <div
      className="p-4 bg-white dark:bg-primaryDark2 rounded-md flex  justify-between gap-12 cursor-pointer shadow-md"
      onClick={navigateToForumPage}
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
      <div className="flex items-center gap-2 mr-16">
        <p className="font-bold">{article.likesNumber}</p>
        <FaHeart />
      </div>
    </div>
  );
};

export default ArticleItem;
