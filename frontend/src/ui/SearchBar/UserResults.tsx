import { FC } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../models/UserModel";

interface UserResultsProps {
  users: UserModel[];
}

const UserResults: FC<UserResultsProps> = ({ users }) => {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} className="py-1">
          <NavLink
            to={`/user/${user.nickname}`}
            className=" py-2 px-4 hover:bg-blue-600 hover:text-blue-50 flex items-center gap-2 rounded-md"
          >
            <img src={user.imageUrl} alt="" className="w-8 h-8 rounded-full" />
            {user.firstName} {user.lastName}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default UserResults;
