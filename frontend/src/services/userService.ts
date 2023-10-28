interface User {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  dateOfBirth: Date | null | [Date | null, Date | null];
  password: string;
}

const API_URL = import.meta.env.VITE_API_URL as string;

const registerUser = async ({
  firstName,
  lastName,
  nickname,
  email,
  dateOfBirth,
  password,
}: User) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        nickname,
        email,
        dateOfBirth,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Rejestracja przebiegła pomyślnie. Możesz się teraz zalogować.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/authenticate`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Zalogowano pomyślnie.",
      ...data,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const updateUserData = async (
  firstName?: string,
  lastName?: string,
  nickname?: string,
  email?: string
) => {
  try {
    const payload: { [key: string]: string } = {};
    if (firstName) payload.firstName = firstName;
    if (lastName) payload.lastName = lastName;
    if (nickname) payload.nickname = nickname;
    if (email) payload.email = email;

    const response = await fetch(`${API_URL}/user`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Dane osobowe zostały zmienione.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const updateUserPassword = async (
  currentPassword: string,
  newPassword: string
) => {
  try {
    const response = await fetch(
      `${API_URL}/user/update-password?oldPassword=${currentPassword}&newPassword=${newPassword}`,
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
      message: "Hasło zostało zmienione.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const updateUserPhoto = async (photo: File) => {
  try {
    const formData = new FormData();
    formData.append("file", photo);
    const response = await fetch(`${API_URL}/user/add-profile-picture`, {
      method: "Post",
      credentials: "include",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Zdjęcie zostało zmienione.",
      imageUrl: data.imageUrl,
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const updateUserPrivacy = async (publicProfile: boolean) => {
  try {
    const response = await fetch(
      `${API_URL}/user/profile-visibility?visible=${publicProfile}`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Ustawienia prywatności zostały zmienione.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const deleteUserAccount = async () => {
  try {
    const response = await fetch(`${API_URL}/user`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Konto zostało usunięte.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        (error as Error).message || "Wystąpił błąd. Spróbuj ponownie później.",
    };
  }
};

const getUserById = async (userId: number) => {
  try {
    const response = await fetch(`${API_URL}/user/id/${userId}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
    return {
      status: "ok",
      message: "Pobrano dane użytkownika.",
      user: data,
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
  registerUser,
  loginUser,
  updateUserData,
  updateUserPassword,
  updateUserPhoto,
  updateUserPrivacy,
  deleteUserAccount,
  getUserById,
};
