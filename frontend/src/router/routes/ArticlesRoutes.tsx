import AddArticlePage from "../../pages/Articles/AddArticlePage";
import ArticlePage from "../../pages/Articles/ArticlePage";
import ArticlePageLayout from "../../pages/Articles/ArticlePageLayout";
import ArticlesPage from "../../pages/Articles/ArticlesPage";
import MyArticlesPage from "../../pages/Articles/MyArticlesPage";
import SavedArticlesPage from "../../pages/Articles/SavedArticlesPage";

const ArticlesRoutes = {
  path: "/articles",
  element: <ArticlePageLayout />,
  children: [
    {
      path: "",
      element: <ArticlesPage />,
    },
    {
      path: "add",
      element: <AddArticlePage />,
    },
    {
      path: "my",
      element: <MyArticlesPage />,
    },
    {
      path: ":article",
      element: <ArticlePage />,
    },
    {
      path: "bookmarks",
      element: <SavedArticlesPage />,
    },
  ],
};

export default ArticlesRoutes;
