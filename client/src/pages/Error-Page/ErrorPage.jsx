import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-light text-center px-4">
      <h1 className="text-6xl font-bold primary-color mb-4">404</h1>
      <h2 className="text-2xl secondary-color mb-6">Oops! Page not found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      <button
        onClick={() => navigate("/")}
        className="bg-primary text-white px-6 py-3 rounded-lg shadow-md pointer bg-hover"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
