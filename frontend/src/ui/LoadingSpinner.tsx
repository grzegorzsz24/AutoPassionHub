import "./LoadingSpinner.css";

import { FC } from "react";

interface LoadingSpinnerProps {
  small?: boolean;
  message?: string;
}

const LoadingSpinner: FC<LoadingSpinnerProps> = ({ small, message }) => {
  if (small) {
    return (
      <div
        className="flex items-center flex-col justify-center gap-2 
      "
      >
        <div className="lds-ring small">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        {message && <p className="text-sm text-blue-600">{message}</p>}
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm overflow-hidden"
    >
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {message && <p className="text-md">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
