const API_URL = import.meta.env.VITE_API_URL as string;

const AddComment = async (content: string, postId: number) => {
  try {
    const response = await fetch(`${API_URL}/user/comments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content, postId }),
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

const DeleteComment = async (id: number) => {
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

const EditComment = async (id: number, content: string) => {
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

export { AddComment, DeleteComment, EditComment, getPostComments };
