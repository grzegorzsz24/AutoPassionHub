import { FC, useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import OutlineButton from "../../ui/OutlineButton";
import { Report } from "../../services/reportService";
import UserModel from "../../models/UserModel";
import { getUserById } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../hooks/useNotification";

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
  const { showErrorNotification } = useNotification();
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
      showErrorNotification(error);
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
    <div className="flex items-center gap-4">
      <div
        className="flex w-full max-w-xl cursor-pointer gap-4 rounded-md bg-white p-4 shadow-md dark:bg-primaryDark2"
        onClick={clickReportHandler}
      >
        {user && (
          <>
            {!report.read && (
              <div className="h-6 w-6 rounded-full bg-green-500"></div>
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
