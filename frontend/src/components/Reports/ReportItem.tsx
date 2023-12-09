import { FC, useEffect, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import { IoClose } from "react-icons/io5";
import OutlineButton from "../../ui/OutlineButton";
import { Report } from "../../services/reportService";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";

interface ReportItemProps {
  report: Report;
  checkReportAsSeenHandler: (reportId: number) => void;
  deleteReportHandler: (reportId: number) => void;
}

const ReportItem: FC<ReportItemProps> = ({
  report,
  checkReportAsSeenHandler,
  deleteReportHandler,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserModel | null>(null);

  const fetchUser = async () => {
    try {
      const data = await getUserById(report.userId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setUser(data.user);
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

  const clickReportHandler = () => {
    if (!report.read) {
      checkReportAsSeenHandler(report.id);
    }
    switch (report.reportType) {
      case "POST_REPORT":
        navigate(`/posts/${report.reportTypeId}`);
        break;
      case "FORUM_REPORT":
        navigate(`/forums/${report.reportTypeId}`);
        break;
      case "EVENT_REPORT":
        navigate(`/events/${report.reportTypeId}`);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex gap-4 items-center">
      <div
        className="bg-white dark:bg-primaryDark2 p-4 rounded-md shadow-md flex gap-4 cursor-pointer max-w-xl w-full"
        onClick={clickReportHandler}
      >
        {user && (
          <>
            {!report.read && (
              <div className="w-6 h-6 bg-green-500 rounded-full"></div>
            )}
            <span>
              Użytkownik{" "}
              <span className="font-bold">
                {user.firstName} {user.lastName}
              </span>{" "}
              zgłosił{" "}
              {report.reportType === "POST_REPORT"
                ? "post"
                : report.reportType === "FORUM_REPORT"
                ? "forum"
                : report.reportType === "EVENT_REPORT"
                ? "wydarzenie"
                : ""}{" "}
              o id: {report.reportTypeId}
            </span>
          </>
        )}
      </div>
      <OutlineButton size="sm" onClick={() => deleteReportHandler(report.id)}>
        <IoClose className="text-lg" />
      </OutlineButton>
    </div>
  );
};

export default ReportItem;
