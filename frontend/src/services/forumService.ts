const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createSuccessResponse } from "./utils";

const createForum = async (
  title: string,
  content: string,
  carBrand: string,
  carModel: string
) => {
  try {
    const response = await fetch(`${API_URL}/user/forums`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, carBrand, carModel }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return createSuccessResponse("Forum zostało stworzone.");
  } catch (error) {
    return createErrorResponse(error);
  }
};

const deleteForum = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/forums/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (response.ok) {
      return createSuccessResponse("Usunięto forum.");
    }
    throw new Error("Nie udało się usunąć forum.");
  } catch (error) {
    return createErrorResponse(error);
  }
};

const getForums = async (
  page: number,
  size: number,
  title?: string,
  carBrand?: string,
  carModel?: string
) => {
  let queryString = "?";

  if (title) {
    queryString += `title=${title}`;
  } else {
    if (page) {
      queryString += `page=${page}&`;
    }
    if (size) {
      queryString += `size=${size}&`;
    }
    if (carBrand) {
      queryString += `&carBrand=${carBrand}&`;
    }
    if (carModel) {
      queryString += `&carModel=${carModel}&`;
    }
  }

  if (queryString.endsWith("&")) {
    queryString = queryString.slice(0, -1);
  }

  try {
    const response = await fetch(`${API_URL}/user/forums/all${queryString}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano fora.",
      data: data.forumDtoList,
      totalNumberOfForums: data.forumsNumber,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const getUserForums = async (nickname: string) => {
  try {
    const response = await fetch(`${API_URL}/user/forums/user/${nickname}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano fora.",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const getForumById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/forums/${id}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano forum.",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const addCommentToForum = async (forumId: number, content: string) => {
  try {
    const response = await fetch(`${API_URL}/user/comments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, forum: forumId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Dodano komentarz.",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const getForumComments = async (forumId: number) => {
  try {
    const response = await fetch(`${API_URL}/user/comments/forum/${forumId}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano komentarze.",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const deleteForumComment = async (commentId: number) => {
  try {
    const response = await fetch(`${API_URL}/user/comments/${commentId}`, {
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

const updateForumComment = async (commentId: number, content: string) => {
  try {
    const response = await fetch(`${API_URL}/user/comments/${commentId}`, {
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

const getSavedForums = async (page: number = 1, size: number = 10) => {
  try {
    const response = await fetch(
      `${API_URL}/user/forums/saved?page=${page}&size=${size}`,
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
      message: "Pobrano zapisane fora.",
      data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const addForumToSaved = async (forumId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/forums/saved?forumId=${forumId}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    console.log(response);
    if (response.ok) {
      return createSuccessResponse("Dodano do zapisanych.");
    }

    const data = await response.json();
    throw new Error(data.message);
  } catch (error) {
    return createErrorResponse(error);
  }
};

export {
  createForum,
  deleteForum,
  getForums,
  getUserForums,
  getForumById,
  addCommentToForum,
  getForumComments,
  deleteForumComment,
  updateForumComment,
  getSavedForums,
  addForumToSaved,
};
