import BookmarksPageLayout from "../../pages/Bookmarks/BookmarksPageLayout";
import Redirect from "../Redirect";
import SavedArticlesPage from "../../pages/Articles/SavedArticlesPage";
import SavedForumsPage from "../../pages/Forums/SavedForumsPage";

const BookmarksRoutes = {
  path: "/bookmarks",
  element: <BookmarksPageLayout />,
  children: [
    {
      path: "",
      element: <Redirect to="/bookmarks/forums" />,
    },
    {
      path: "forums",
      element: <SavedForumsPage />,
    },
    {
      path: "articles",
      element: <SavedArticlesPage />,
    },
  ],
};

export default BookmarksRoutes;
