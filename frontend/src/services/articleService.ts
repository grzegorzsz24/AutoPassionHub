const API_URL = import.meta.env.VITE_API_URL as string;

const createArticle = async (title: string, content: string) => {
  try {
    const response = await fetch(`${API_URL}/user/articles`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        title,
        content,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message:
        "Artykuł został stworzony i oczekuje na zaakceptowanie przez administratora.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const getArticles = async (page: number = 1, size: number = 10) => {
  try {
    const response = await fetch(
      `${API_URL}/user/articles?page=${page}&size=${size}`,
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
      data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const getArticleById = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/articles/${id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano post",
      data,
    };
  } catch (error) {
    return (
      (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później."
    );
  }
};

const toggleLike = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/likes`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        article: id,
      }),
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
    return (
      (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później."
    );
  }
};

export { createArticle, getArticles, getArticleById, toggleLike };
