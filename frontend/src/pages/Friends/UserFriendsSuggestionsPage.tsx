import { useEffect, useState } from "react";

import AddFriendElement from "../../components/Friends/AddFriendElement";
import FriendSkeleton from "../../components/Friends/FriendSkeleton";
import NoContent from "../../ui/NoContent";
import UserModel from "../../models/UserModel";
import { getUserNonFriends } from "../../services/friendService";
import { useNotification } from "../../hooks/useNotification";

const UserFriendsSuggestionsPage = () => {
  const { showErrorNotification } = useNotification();
  const [nonFriends, setNonFriends] = useState<UserModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const data = await getUserNonFriends();
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setNonFriends(data.nonFriends);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUserFromList = (id: number) => {
    setNonFriends((prev) => prev.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="w-full text-primaryDark dark:text-blue-50 ">
      <div className="flex flex-col gap-6 ">
        {isLoading && (
          <>
            <FriendSkeleton />
            <FriendSkeleton />
            <FriendSkeleton />
          </>
        )}
        {!isLoading &&
          nonFriends.map((user) => (
            <AddFriendElement
              key={user.id}
              user={user}
              deleteUserFromList={deleteUserFromList}
            />
          ))}
        {!isLoading && nonFriends.length === 0 && (
          <NoContent>Brak użytkowników do wyświetlenia</NoContent>
        )}
      </div>
    </div>
  );
};

export default UserFriendsSuggestionsPage;
