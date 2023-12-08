import ArticleModel from "../../models/ArticleModel";
import { FC } from "react";
import { FaBookReader } from "react-icons/fa";
import { NavLink } from "react-router-dom";

interface ForumResultsProps {
  articles: ArticleModel[];
}

const ArticleResults: FC<ForumResultsProps> = ({ articles }) => {
  return (
    <ul>
      {articles.map((article) => (
        <li key={article.id} className="py-1">
          <NavLink
            to={`/articles/${article.id}`}
            className=" py-2 px-4 hover:bg-blue-600 hover:text-blue-50 flex flex-col rounded-md"
          >
            <div className="flex items-center text-indigo-500">
              <FaBookReader className="inline-block mr-2" />
              <span className="text-xs">Artykuł</span>
            </div>
            <span className="box">{article.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ArticleResults;
