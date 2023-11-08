import ArticleItem from "./ArticleItem";
import ArticleModel from "../../models/ArticleModel";
import { FC } from "react";

interface ForumListProps {
  articles: ArticleModel[];
}

const ArticleList: FC<ForumListProps> = ({ articles }) => {
  return (
    <div className="flex flex-col gap-4 max-w-4xl">
      {articles.map((article) => (
        <ArticleItem key={article.id} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
