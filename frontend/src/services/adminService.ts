const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createSuccessResponse } from "./utils";

const getArticlesWaitingForApproval = async (
  page: number = 1,
  size: number = 10
) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/articles/pending?page=${page}&size=${size}`,
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
      message: "Pobrano artykuły",
      data: data.articles,
      totalNumberOfArticles: data.articlesNumber,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

const approveArticle = async (id: number) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/articles/pending?articleId=${id}`,
      {
        method: "POST",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Nie udało się zatwierdzić artykułu");
    }
    return createSuccessResponse("Zatwierdzono artykuł");
  } catch (error) {
    return createErrorResponse(error);
  }
};

const rejectArticle = async (id: number) => {
  try {
    const response = await fetch(
      `${API_URL}/admin/articles/pending?articleId=${id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );
    if (!response.ok) {
      throw new Error("Nie udało się odrzucić artykułu");
    }
    return createSuccessResponse("Odrzucono artykuł");
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { getArticlesWaitingForApproval, approveArticle, rejectArticle };
