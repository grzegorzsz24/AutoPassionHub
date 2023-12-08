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
            <div className="flex items-center text-blue-50 bg-indigo-500 w-min py-1 px-2 rounded-md">
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
