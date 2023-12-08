import { FC } from "react";
import ForumModel from "../../models/ForumModel";
import { MdForum } from "react-icons/md";
import { NavLink } from "react-router-dom";

interface ForumResultsProps {
  forums: ForumModel[];
}

const ForumResults: FC<ForumResultsProps> = ({ forums }) => {
  return (
    <ul>
      {forums.map((forum) => (
        <li key={forum.id} className="py-1">
          <NavLink
            to={`/forums/${forum.id}`}
            className=" py-2 px-4 hover:bg-blue-600 hover:text-blue-50 flex flex-col rounded-md"
          >
            <div className="flex items-center text-blue-50 bg-green-500 w-min py-1 px-2 rounded-md">
              <MdForum className="inline-block mr-2" />
              <span className="text-xs">Forum</span>
            </div>
            <span className="box">{forum.title}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default ForumResults;
