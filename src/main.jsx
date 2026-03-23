import { createRoot } from "react-dom/client";
import App from "./app/App.jsx";
import "./styles/index.css";
import "./app/i18n/config";
import setupAxiosInterceptors from "./axiosInstance/axiosApi.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = createRoot(document.getElementById("root"));
setupAxiosInterceptors();
root.render(
  <>
    <ToastContainer />
    <App />
  </>,
);
