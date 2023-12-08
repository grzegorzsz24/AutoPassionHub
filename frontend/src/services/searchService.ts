import { createErrorResponse } from "./utils";

const API_URL = import.meta.env.VITE_API_URL as string;

const getSearchResults = async (
  searchQuery: string,
  abortController: AbortController
) => {
  try {
    const response = await fetch(
      `${API_URL}/user/search?keyword=${searchQuery}`,
      {
        method: "GET",
        credentials: "include",
        signal: abortController.signal,
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano",
      users: data.users,
      posts: data.posts,
      articles: data.articles,
      forums: data.forums,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { getSearchResults };
