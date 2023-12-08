const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse, createSuccessResponse } from "./utils";

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
    return createErrorResponse(error);
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
    return createErrorResponse(error);
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
    return createErrorResponse(error);
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
    return createErrorResponse(error);
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
    if (!response.ok) {
      throw new Error(data.message);
    }
    return createSuccessResponse("Wysłano zaproszenie.");
  } catch (error) {
    return createErrorResponse(error);
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
    return createSuccessResponse("Zaakceptowano zaproszenie do znajomych.");
  } catch (error) {
    return createErrorResponse(error);
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
    return createSuccessResponse("Odrzucono zaproszenie do znajomych.");
  } catch (error) {
    return createErrorResponse(error);
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
    return createSuccessResponse("Usunięto znajomego.");
  } catch (error) {
    return createErrorResponse(error);
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
