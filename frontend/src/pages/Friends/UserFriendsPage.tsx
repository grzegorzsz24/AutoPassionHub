import { useEffect, useState } from "react";

import DeleteFriendElement from "../../components/Friends/DeleteFriendElement";
import FriendSkeleton from "../../components/Friends/FriendSkeleton";
import NoContent from "../../ui/NoContent";
import UserModel from "../../models/UserModel";
import { getUserFriends } from "../../services/friendService";
import { useAppSelector } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";

const UserFriendsPage = () => {
  const { showErrorNotification } = useNotification();
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userId } = useAppSelector((state) => state.user);

  const getFriends = async () => {
    try {
      setIsLoading(true);
      const response = await getUserFriends(userId);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      setFriends(response.friends);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFriendFromList = async (friendId: number) => {
    setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
  };

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <div className="flex flex-col  gap-6 text-primaryDark dark:text-blue-50">
      {isLoading && (
        <>
          <FriendSkeleton />
          <FriendSkeleton />
          <FriendSkeleton />
        </>
      )}
      {!isLoading &&
        friends.map((friend) => (
          <DeleteFriendElement
            key={friend.id}
            user={friend}
            deleteUserFromList={deleteFriendFromList}
          />
        ))}
      {!isLoading && friends.length === 0 && (
        <NoContent>Brak znajomych do wyświetlenia</NoContent>
      )}
    </div>
  );
};

export default UserFriendsPage;
