const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE as string;

interface ErrorResponse {
  status: "error";
  message: string;
}

interface SuccessResponse {
  status: "ok";
  message: string;
}

export const createErrorResponse = (error: unknown): ErrorResponse => {
  if (error instanceof Error) {
    return {
      status: "error",
      message: error.message,
    };
  }
  return {
    status: "error",
    message: ERROR_MESSAGE,
  };
};

export const createSuccessResponse = (message: string): SuccessResponse => {
  return {
    status: "ok",
    message,
  };
};
