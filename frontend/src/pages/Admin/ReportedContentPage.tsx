import { FC, useEffect, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import {
  checkReportAsSeen,
  deleteReport,
  getReports,
} from "../../services/reportService";

import { Report } from "../../services/reportService";
import ReportItem from "../../components/Reports/ReportItem";
import { useAppDispatch } from "../../store/store";

interface ReportedContentPageProps {
  reportType: "POST_REPORT" | "FORUM_REPORT" | "EVENT_REPORT";
}

const ReportedContentPage: FC<ReportedContentPageProps> = ({ reportType }) => {
  const dispatch = useAppDispatch();
  const [reports, setReports] = useState<Report[]>([]);

  const fetchReports = async () => {
    try {
      const data = await getReports(reportType);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setReports(data.reports);
    } catch (error) {
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: "Nie udało się pobrać zgłoszeń",
        })
      );
    }
  };

  const checkReportAsSeenHandler = async (reportId: number) => {
    try {
      const data = await checkReportAsSeen(reportId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, read: true } : report
        )
      );
    } catch (error) {
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: "Nie udało się oznaczyć zgłoszenia jako przeczytane",
        })
      );
    }
  };

  const deleteReportHandler = async (reportId: number) => {
    try {
      const data = await deleteReport(reportId);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setReports((prev) => prev.filter((report) => report.id !== reportId));
    } catch (error) {
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: "Nie udało się usunąć zgłoszenia",
        })
      );
    }
  };

  useEffect(() => {
    fetchReports();
  }, [reportType]);

  return (
    <div className="flex flex-col gap-6">
      {reports.map((report) => (
        <ReportItem
          report={report}
          key={report.id}
          checkReportAsSeenHandler={checkReportAsSeenHandler}
          deleteReportHandler={deleteReportHandler}
        />
      ))}
    </div>
  );
};

export default ReportedContentPage;
