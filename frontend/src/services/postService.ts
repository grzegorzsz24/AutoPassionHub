const API_URL = import.meta.env.VITE_API_URL as string;

const createPost = async (content: string, files: File[]) => {
  const formData = new FormData();
  formData.append("content", content);
  formData.append("user", "kacper123");
  files.forEach((file) => formData.append("file", file));

  try {
    const response = await fetch(`${API_URL}/user/posts`, {
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
      message: "Dodano post.",
      post: data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/user/posts`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano posty.",
      posts: data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

export { createPost };
