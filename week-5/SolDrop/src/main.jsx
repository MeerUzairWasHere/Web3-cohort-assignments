import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

import "./index.css";
import { Buffer } from "buffer/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
window.global = window;
import process from "process";
window.Buffer = Buffer;
window.process = process;
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    <ToastContainer position="bottom-right" autoClose={5000} />
  </StrictMode>
);
