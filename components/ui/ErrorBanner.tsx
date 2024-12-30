import { useEffect } from "react";

type ErrorBannerProps = {
  message: string;
  onClose: () => void;
};

const ErrorBanner = ({ message, onClose }: ErrorBannerProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-red-500 text-white rounded-lg shadow-lg px-4 py-2 max-w-sm w-full flex items-center justify-between">
      <span className="text-sm">{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-300 focus:outline-none ml-4"
      >
        ✕
      </button>
    </div>
  );
};

export default ErrorBanner;
