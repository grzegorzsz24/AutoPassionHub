import ArticleMenu from "../../components/Menu/ArticleMenu";
import { Outlet } from "react-router-dom";

const ArticlePageLayout = () => {
  return (
    <div className="px-6 py-12 flex items-start gap-8 xl:gap-32 h-full overflow-y-auto text-primaryDark2 dark:text-blue-50 ">
      <ArticleMenu />
      <div className="flex-grow self-stretch">
        <Outlet />
      </div>
    </div>
  );
};

export default ArticlePageLayout;
