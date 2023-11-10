import ArticleMenu from "../../components/Menu/ArticleMenu";
import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";

const ArticlePageLayout = () => {
  return (
    <PageWithAsideMenuLayout menu={<ArticleMenu />} content={<Outlet />} />
  );
};

export default ArticlePageLayout;
