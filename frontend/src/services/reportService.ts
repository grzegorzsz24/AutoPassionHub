import { createErrorResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL as string;

type ReportType = "POST_REPORT" | "FORUM_REPORT" | "EVENT_REPORT";

const getReports = async (reportType: ReportType) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/reports?reportType=${reportType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano raporty.",
      reports: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const checkReportAsSeen = async (id: number) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/reports/read?reportId=${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
      }
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Oznaczono raport jako przeczytany.",
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const deleteReport = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/admin/reports/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Usunięto raport.",
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const reportPost = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/posts/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        reportTypeId: id,
        reportType: "POST_REPORT",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Zgłoszono post.",
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const reportForum = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/forums/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        reportTypeId: id,
        reportType: "FORUM_REPORT",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Zgłoszono forum.",
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const reportEvent = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/events/report`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({
        reportTypeId: id,
        reportType: "EVENT_REPORT",
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Zgłoszono wydarzenie.",
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export {
  getReports,
  checkReportAsSeen,
  deleteReport,
  reportPost,
  reportForum,
  reportEvent,
};
