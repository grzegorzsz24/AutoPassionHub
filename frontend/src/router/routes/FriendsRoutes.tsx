import ReceivedInvitationsPage from "../../pages/Friends/ReceivedInvitationsPage";
import SentInvitationsPage from "../../pages/Friends/SentInvitationsPage";
import UserFriendsPage from "../../pages/Friends/UserFriendsPage";
import UserFriendsPageLayout from "../../pages/Friends/UserFriendsPageLayout";
import UserFriendsSuggestionsPage from "../../pages/Friends/UserFriendsSuggestionsPage";

const FriendsRoutes = {
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
};

export default FriendsRoutes;
