import AddArticlePage from "../pages/Articles/AddArticlePage";
import AddForumPage from "../pages/Forums/AddForumPage";
import AppLayout from "../pages/AppLayout";
import ArticlePage from "../pages/Articles/ArticlePage";
import ArticlePageLayout from "../pages/Articles/ArticlePageLayout";
import ArticlesPage from "../pages/Articles/ArticlesPage";
import BookmarksPageLayout from "../pages/Bookmarks/BookmarksPageLayout";
import EventPage from "../pages/Events/EventPage";
import EventsPage from "../pages/Events/EventsPage";
import EventsPageLayout from "../pages/Events/EventsPageLayout";
import ForumPage from "../pages/Forums/ForumPage";
import ForumPageLayout from "../pages/Forums/ForumPageLayout";
import ForumsPage from "../pages/Forums/ForumsPage";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";
import MainPageLayout from "../pages/MainPageLayout";
import MyArticlesPage from "../pages/Articles/MyArticlesPage";
import MyForumsPage from "../pages/Forums/MyForumsPage";
import OutletLayout from "../pages/OutletLayout";
import ProtectedRoute from "./ProtectedRoute";
import ReceivedInvitationsPage from "../pages/Friends/ReceivedInvitationsPage";
import Redirect from "./Redirect";
import RegisterPage from "../pages/RegisterPage";
import SavedArticlesPage from "../pages/Articles/SavedArticlesPage";
import SavedForumsPage from "../pages/Forums/SavedForumsPage";
import SentInvitationsPage from "../pages/Friends/SentInvitationsPage";
import UserCloseAccountPage from "../pages/UserSettings/UserCloseAccountPage";
import UserFriendsPage from "../pages/Friends/UserFriendsPage";
import UserFriendsPageLayout from "../pages/Friends/UserFriendsPageLayout";
import UserFriendsSuggestionsPage from "../pages/Friends/UserFriendsSuggestionsPage";
import UserPage from "../pages/UserPage";
import UserSettingsDataPage from "../pages/UserSettings/UserSettingsDataPage";
import UserSettingsPageLayout from "../pages/UserSettings/UserSettingsPageLayout";
import UserSettingsPhoto from "../pages/UserSettings/UserSettingsPhoto";
import UserSettingsPrivacyPage from "../pages/UserSettings/UserSettingsPrivacyPage";
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
          {
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
          },
          {
            path: "/events",
            element: <EventsPageLayout />,
            children: [
              {
                path: "",
                element: <EventsPage />,
              },
              {
                path: ":id",
                element: <EventPage />,
              },
              {
                path: "add",
                element: <p>Dodaj wydarzenie</p>,
              },
            ],
          },
          {
            path: "/friends",
            element: <UserFriendsPageLayout />,
            children: [
              {
                path: "",
                element: <UserFriendsPage />,
              },
              {
                path: "invitations",
                element: <ReceivedInvitationsPage />,
              },
              {
                path: "suggestions",
                element: <UserFriendsSuggestionsPage />,
              },
              {
                path: "pending",
                element: <SentInvitationsPage />,
              },
            ],
          },
          {
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
          },
          {
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
          },
          {
            path: "/me",
            element: <OutletLayout />,
            children: [
              {
                path: "",
                element: <UserPage />,
              },
              {
                path: "settings",
                element: <UserSettingsPageLayout />,
                children: [
                  {
                    path: "data",
                    element: <UserSettingsDataPage />,
                  },
                  {
                    path: "privacy",
                    element: <UserSettingsPrivacyPage />,
                  },
                  {
                    path: "close",
                    element: <UserCloseAccountPage />,
                  },
                  {
                    path: "photo",
                    element: <UserSettingsPhoto />,
                  },
                ],
              },
            ],
          },
          {
            path: "/user/:nickname",
            element: <UserPage />,
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
