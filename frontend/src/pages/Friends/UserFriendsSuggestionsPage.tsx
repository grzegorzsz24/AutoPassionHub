import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import AddFriendElement from "../../components/Friends/AddFriendElement";
import NoContent from "../../ui/NoContent";
import UserModel from "../../models/UserModel";
import { getUserNonFriends } from "../../services/friendService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

const UserFriendsSuggestionsPage = () => {
  const dispatch = useAppDispatch();
  const [nonFriends, setNonFriends] = useState<UserModel[]>([]);

  const getUsers = async () => {
    try {
      const data = await getUserNonFriends();
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setNonFriends(data.nonFriends);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    }
  };

  const deleteUserFromList = (id: number) => {
    setNonFriends((prev) => prev.filter((user) => user.id !== id));
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="text-primaryDark dark:text-blue-50 w-full ">
      <div className="flex flex-col gap-6 ">
        {nonFriends.map((user) => (
          <AddFriendElement
            key={user.id}
            user={user}
            deleteUserFromList={deleteUserFromList}
          />
        ))}
        {nonFriends.length === 0 && (
          <NoContent>Brak użytkowników do wyświetlenia</NoContent>
        )}
      </div>
    </div>
  );
};

export default UserFriendsSuggestionsPage;
