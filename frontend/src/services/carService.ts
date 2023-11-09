const API_URL = import.meta.env.VITE_API_URL as string;

import { createErrorResponse } from "./utils";

const getAllCarsWithModels = async () => {
  try {
    const response = await fetch(`${API_URL}/cars`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    return {
      status: "ok",
      message: "Pobrano listę samochodów.",
      cars: data,
    };
  } catch (error) {
    return createErrorResponse(error);
  }
};

export { getAllCarsWithModels };
