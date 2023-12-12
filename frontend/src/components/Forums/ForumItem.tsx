import { FC, useState } from "react";

import DateFormatter from "../../utils/DateFormatter";
import ForumModel from "../../models/ForumModel";
import { MdQuestionAnswer } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import { addForumToSaved } from "../../services/forumService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

interface ForumItemProps {
  forum: ForumModel;
}

const ForumItem: FC<ForumItemProps> = ({ forum }) => {
  const {
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
  } = useNotification();
  const navigate = useNavigate();
  const navigateToForumPage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if ((event.target as HTMLElement).closest("button")) {
      event.stopPropagation();
      return;
    }
    navigate(`/forums/${forum.id}`);
  };
  const [isBookmarked, setIsBookmarked] = useState<boolean>(forum.saved);

  const toogleBookmarkHandler = async () => {
    try {
      const data = await addForumToSaved(forum.id);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      if (isBookmarked) {
        showInfoNotification("Usunięto z zapisanych");
      } else {
        showSuccessNotification(data.message);
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      showErrorNotification(error);
    }
  };

  return (
    <div
      className="flex cursor-pointer justify-between gap-12 rounded-md  bg-white p-4 shadow-md dark:bg-primaryDark2"
      onClick={(event) => navigateToForumPage(event)}
    >
      <div>
        <p className="text-xl font-bold ">{forum.title}</p>

        <div className="mb-2 flex gap-2  text-xs text-blue-600">
          <p>{forum.carBrand}</p>
          <p>{forum.carModel}</p>
        </div>
        <div className="flex items-center gap-4 text-sm ">
          <p>
            {forum.firstName} {forum.lastName}
          </p>
          <RiArrowRightDoubleFill />
          <p className=" font-semibold text-blue-600">
            {DateFormatter.formatDate(forum.createdAt)}
          </p>
        </div>
      </div>
      <div className="mr-16 flex items-center gap-8">
        <div className="flex items-center gap-1">
          <p className="font-bold">{forum.commentsNumber}</p>
          <MdQuestionAnswer />
        </div>
        <ToogleBookmarkButton
          isBookmarked={isBookmarked}
          onClick={toogleBookmarkHandler}
          size="small"
        />
      </div>
    </div>
  );
};

export default ForumItem;
