import AdminPageLayout from "../../pages/Admin/AdminPageLayout";
import AdminRoute from "../AdminRoute";
import PendingArticlesPage from "../../pages/Admin/PendingArticlesPage";
import ReportedContentPage from "../../pages/Admin/ReportedContentPage";

const AdminRoutes = {
  path: "admin",
  element: <AdminRoute element={<AdminPageLayout />} />,
  children: [
    {
      path: "pending/articles",
      element: <PendingArticlesPage />,
    },
    {
      path: "posts",
      element: <ReportedContentPage reportType="POST_REPORT" />,
    },
    {
      path: "forums",
      element: <ReportedContentPage reportType="FORUM_REPORT" />,
    },
    {
      path: "events",
      element: <ReportedContentPage reportType="EVENT_REPORT" />,
    },
  ],
};

export default AdminRoutes;
