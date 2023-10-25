interface User {
  firstName: string;
  lastName: string;
  nickname: string;
  email: string;
  dateOfBirth: Date | null | [Date | null, Date | null];
  password: string;
}

const registerUser = async ({
  firstName,
  lastName,
  nickname,
  email,
  dateOfBirth,
  password,
}: User) => {
  try {
    const response = await fetch("http://localhost:8080/auth/register", {
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
    const response = await fetch("http://localhost:8080/auth/authenticate", {
      method: "POST",
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
  userId: string,
  firstName: string,
  lastName: string,
  nickname: string,
  email: string
) => {
  try {
    const response = await fetch(`http://localhost:8080/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        firstName,
        lastName,
        nickname,
        email,
      }),
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
    const response = await fetch("http://localhost:8080/user/password", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
      }),
    });

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

export { registerUser, loginUser, updateUserData, updateUserPassword };