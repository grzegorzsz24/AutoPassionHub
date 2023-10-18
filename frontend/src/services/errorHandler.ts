const handleError = (
  error: unknown,
  defaultMessage = "Wystąpił błąd. Spróbuj ponownie później."
) => {
  if (error instanceof Error) {
    return error;
  } else {
    return new Error(defaultMessage);
  }
};

export default handleError;
