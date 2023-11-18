const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse } from "./utils";

const getNotifications = async () => {
  try {
    const response = await fetch(`${API_URL}/user/notifications`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano powiadomienia",
      notifications: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const markNotificationAsRead = async (notificationId: number) => {
  const formData = new FormData();
  formData.append("notificationId", notificationId.toString());
  try {
    const response = await fetch(`${API_URL}/user/notification/read`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Oznaczono jako przeczytane",
      notification: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { getNotifications, markNotificationAsRead };
