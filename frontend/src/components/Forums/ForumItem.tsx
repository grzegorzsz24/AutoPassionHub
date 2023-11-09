import DateFormatter from "../../utils/DateFormatter";
import { FC } from "react";
import ForumModel from "../../models/ForumModel";
import { MdQuestionAnswer } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface ForumItemProps {
  forum: ForumModel;
}

const ForumItem: FC<ForumItemProps> = ({ forum }) => {
  const navigate = useNavigate();
  const navigateToForumPage = () => {
    navigate(`/forums/${forum.id}`);
  };

  return (
    <div
      className="p-4 bg-white dark:bg-primaryDark2 rounded-md flex  justify-between gap-12 cursor-pointer shadow-md"
      onClick={navigateToForumPage}
    >
      <div>
        <p className="font-bold text-xl ">{forum.title}</p>
        <div className="flex gap-2 text-xs  mb-2 text-blue-600">
          <p>{forum.carBrand}</p>
          <p>{forum.carModel}</p>
        </div>
        <div className="flex gap-4 items-center text-sm ">
          <p>
            {forum.firstName} {forum.lastName}
          </p>
          <RiArrowRightDoubleFill />
          <p className=" font-semibold text-blue-600">
            {DateFormatter.formatDate(forum.createdAt)}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2 mr-16">
        <p className="font-bold">{forum.commentsNumber}</p>
        <MdQuestionAnswer />
      </div>
    </div>
  );
};

export default ForumItem;
