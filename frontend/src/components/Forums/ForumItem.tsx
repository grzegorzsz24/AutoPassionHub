import { FC, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import DateFormatter from "../../utils/DateFormatter";
import ForumModel from "../../models/ForumModel";
import { MdQuestionAnswer } from "react-icons/md";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import ToogleBookmarkButton from "../../ui/ToogleBookmarkButton";
import { addForumToSaved } from "../../services/forumService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface ForumItemProps {
  forum: ForumModel;
}

const ForumItem: FC<ForumItemProps> = ({ forum }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const navigateToForumPage = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
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
        dispatch(
          addNotification({
            type: NotificationStatus.INFO,
            message: "Usunięto z zapisanych",
          })
        );
      } else {
        dispatch(
          addNotification({
            type: NotificationStatus.SUCCESS,
            message: data.message,
          })
        );
      }
      setIsBookmarked((prev) => !prev);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  return (
    <div
      className="p-4 bg-white dark:bg-primaryDark2 rounded-md flex  justify-between gap-12 cursor-pointer shadow-md"
      onClick={(event) => navigateToForumPage(event)}
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
      <div className="flex items-center gap-8 mr-16">
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
