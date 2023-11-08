const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createSuccessResponse } from "./utils";

const addComment = async (postId: number, content: string) => {
  try {
    const response = await fetch(`${API_URL}/user/comments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, post: postId }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Dodano komentarz.",
      comment: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const deleteComment = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return createSuccessResponse("Usunięto komentarz.");
    }
    const data = await response.json();
    throw new Error(data.message);
  } catch (error) {
    return createErrorResponse(error);
  }
};

const editComment = async (id: number, content: string) => {
  try {
    const response = await fetch(`${API_URL}/user/comments/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });
    if (response.ok) {
      return createSuccessResponse("Edytowano komentarz.");
    }
    const data = await response.json();
    throw new Error(data.message);
  } catch (error) {
    return createErrorResponse(error);
  }
};

const getPostComments = async (postId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/comments/post?postId=${postId}`,
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
      message: "Pobrano komentarze.",
      comments: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { addComment, deleteComment, editComment, getPostComments };
