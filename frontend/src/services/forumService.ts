const API_URL = import.meta.env.VITE_API_URL as string;

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

    return {
      status: "ok",
      message: "Utworzono forum.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
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
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const getUserForums = async (nickname: string) => {
  try {
    const response = await fetch(`${API_URL}/user/forums/${nickname}`, {
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
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
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
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

export { createForum, getForums, getUserForums, getForumById };
