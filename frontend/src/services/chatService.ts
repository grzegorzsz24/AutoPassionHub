const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse } from "./utils";

const getAllChats = async () => {
  try {
    const response = await fetch(`${API_URL}/user/chats`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano czaty",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const getChatMessages = async (chatId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/chat/messages?chatId=${chatId}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano wiadomości",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { getAllChats, getChatMessages };
