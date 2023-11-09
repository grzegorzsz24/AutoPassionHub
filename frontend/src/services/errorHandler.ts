const ERROR_MESSAGE = import.meta.env.VITE_ERROR_MESSAGE as string;

const handleError = (error: unknown, defaultMessage = ERROR_MESSAGE) => {
  if (error instanceof Error) {
    return error;
  } else {
    return new Error(defaultMessage);
  }
};

export default handleError;
