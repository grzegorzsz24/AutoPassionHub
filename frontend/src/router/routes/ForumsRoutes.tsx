import AddForumPage from "../../pages/Forums/AddForumPage";
import ForumPage from "../../pages/Forums/ForumPage";
import ForumPageLayout from "../../pages/Forums/ForumPageLayout";
import ForumsPage from "../../pages/Forums/ForumsPage";
import MyForumsPage from "../../pages/Forums/MyForumsPage";
import SavedForumsPage from "../../pages/Forums/SavedForumsPage";

const ForumsRoutes = {
  path: "/forums",
  element: <ForumPageLayout />,
  children: [
    {
      path: "",
      element: <ForumsPage />,
    },
    {
      path: ":forum",
      element: <ForumPage />,
    },
    {
      path: "add",
      element: <AddForumPage />,
    },
    {
      path: "my",
      element: <MyForumsPage />,
    },
    {
      path: "bookmarks",
      element: <SavedForumsPage />,
    },
  ],
};

export default ForumsRoutes;
