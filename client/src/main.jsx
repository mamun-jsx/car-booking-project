import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Config/Provider/AuthProvider.jsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// create Query
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </AuthProvider>
);
