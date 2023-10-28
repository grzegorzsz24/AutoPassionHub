const API_URL = import.meta.env.VITE_API_URL as string;

const getUserFriends = async (userId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/user/friendship/list?userId=${userId}`,
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
      friends: data,
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
const getReceivedInvitations = async () => {
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

const getSentInvitations = async () => {
  try {
    const response = await fetch(`${API_URL}/user/invitations/sent`, {
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

const acceptFriendRequest = async (invitationId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/invitations/accept?invitationId=${invitationId}`,
      {
        method: "POST",
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
      message: "Zaakceptowano zaproszenie do znajomych.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const rejectFriendRequest = async (invitationId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/invitations/reject?invitationId=${invitationId}`,
      {
        method: "POST",
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
      message: "Odrzucono zaproszenie do znajomych.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const deleteFriend = async (friendId: number) => {
  try {
    const response = await fetch(
      `${API_URL}/user/friendship/remove?friendId=${friendId}`,
      {
        method: "DELETE",
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
      message: "Usunięto znajomego.",
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
  getReceivedInvitations,
  getSentInvitations,
  acceptFriendRequest,
  rejectFriendRequest,
  deleteFriend,
};
