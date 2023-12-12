import AdminRoutes from "./routes/AdminRoutes";
import AppLayout from "../pages/AppLayout";
import ArticlesRoutes from "./routes/articlesRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import BookmarksRoutes from "./routes/BookmarksRoutes";
import ChatsRoutes from "./routes/ChatsRoutes";
import EventsRoutes from "./routes/EventsRoutes";
import ForumsRoutes from "./routes/ForumsRoutes";
import FriendsRoutes from "./routes/FriendsRoutes";
import MainPage from "../pages/MainPage";
import MainPageLayout from "../pages/MainPageLayout";
import MeRoutes from "./routes/MeRoutes";
import PostsRoutes from "./routes/PostsRoutes";
import ProtectedRoute from "./ProtectedRoute";
import UserRoutes from "./routes/UsersRoutes";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRoute element={<MainPageLayout />} />,
        children: [
          {
            path: "/",
            element: <MainPage />,
          },
          PostsRoutes,
          ArticlesRoutes,
          EventsRoutes,
          FriendsRoutes,
          ChatsRoutes,
          BookmarksRoutes,
          ForumsRoutes,
          MeRoutes,
          UserRoutes,
          AdminRoutes,
        ],
      },
      ...AuthRoutes,
    ],
  },
]);

export default router;
