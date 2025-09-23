import React from "react";
import ReactDOM from "react-dom/client";
import App from "./pages/App";
import "./styles/chat.css";

// Create root and render App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
