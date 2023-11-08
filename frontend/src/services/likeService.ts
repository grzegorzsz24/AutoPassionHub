const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse } from "./utils";

const toggleLike = async (postId: number) => {
  try {
    const response = await fetch(`${API_URL}/user/likes`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ post: postId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Dodano/zabrano like'a",
      like: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { toggleLike };
