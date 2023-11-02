const API_URL = import.meta.env.VITE_API_URL as string;

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
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const deleteComment = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/user/comments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (response.ok) {
      return {
        status: "ok",
        message: "Usunięto komentarz.",
      };
    }
    const data = await response.json();
    throw new Error(data.message);
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
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
      return {
        status: "ok",
        message: "Edytowano komentarz.",
      };
    }
    const data = await response.json();
    throw new Error(data.message);
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
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
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

export { addComment, deleteComment, editComment, getPostComments };
