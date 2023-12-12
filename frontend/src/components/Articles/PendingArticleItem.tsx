import { FC, useState } from "react";
import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";

import ArticleModel from "../../models/ArticleModel";
import DateFormatter from "../../utils/DateFormatter";
import PrimaryButton from "../../ui/PrimaryButton";
import { RiArrowRightDoubleFill } from "react-icons/ri";

interface PendingArticleItemProps {
  article: ArticleModel;
  approveArticle: (id: number) => void;
  rejectArticle: (id: number) => void;
}

const PendingArticleItem: FC<PendingArticleItemProps> = ({
  article,
  approveArticle,
  rejectArticle,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleExpandHandler = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-between gap-2 rounded-md bg-white p-4 shadow-md dark:bg-primaryDark2">
      <div className="flex  items-center justify-between gap-12">
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
        <div className="flex flex-col items-stretch gap-2">
          <PrimaryButton
            size="sm"
            color="green"
            onClick={() => approveArticle(article.id)}
          >
            Zatwierdź
          </PrimaryButton>
          <PrimaryButton
            size="sm"
            color="red"
            onClick={() => rejectArticle(article.id)}
          >
            Odrzuć
          </PrimaryButton>
        </div>
      </div>
      <button
        className="mx-auto cursor-pointer text-xl transition-all hover:text-blue-600"
        onClick={toggleExpandHandler}
      >
        {isExpanded ? <FaArrowAltCircleUp /> : <FaArrowCircleDown />}
      </button>
      {isExpanded && <div>{article.content}</div>}
    </div>
  );
};

export default PendingArticleItem;
