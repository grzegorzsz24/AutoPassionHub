import { useEffect, useState } from "react";

import AddFriendElement from "../../components/Friends/AddFriendElement";
import UserModel from "../../models/UserModel";
import { getUserNonFriends } from "../../services/friendsService";

const UserFriendsSuggestionsPage = () => {
  const [nonFriends, setNonFriends] = useState<UserModel[]>([]);

  const getUsers = async () => {
    const data = await getUserNonFriends();
    setNonFriends(data.nonFriends);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="text-primaryDark dark:text-blue-50 w-full py-4">
      <div className="flex flex-col gap-6 ">
        {nonFriends.map((user) => (
          <AddFriendElement key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserFriendsSuggestionsPage;
