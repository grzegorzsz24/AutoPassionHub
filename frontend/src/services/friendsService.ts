const API_URL = import.meta.env.VITE_API_URL as string;

const getUserFriends = async (userId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/friendship/list?userId=${userId}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano listę znajomych.",
      friends: data.friends,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const getUserNonFriends = async () => {
  try {
    const response = await fetch(`${API_URL}/user/friendship/not-friends`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano listę nieznajomych.",
      nonFriends: data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};
const getPendingInvitations = async () => {
  try {
    const response = await fetch(`${API_URL}/user/invitations/pending`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano listę użytkowników do których wysłano zaproszenie.",
      invitations: data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const sendFriendRequest = async (userId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/invitations/send?receiverId=${userId}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Wysłano zaproszenie do znajomych.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

export {
  getUserFriends,
  getUserNonFriends,
  sendFriendRequest,
  getPendingInvitations,
};
