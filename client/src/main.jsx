import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <App />
    </StrictMode>
  </BrowserRouter>
);
// https://www.youtube.com/watch?v=tBObk72EYYw
// 4h 31m
// figma
// https://www.figma.com/design/5f0dxevjG5nueTeNhWpOoU/CarRental?node-id=1-399 