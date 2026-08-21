import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import App from "./App";

const app = (
  <StrictMode>
    <App />
  </StrictMode>
);
const root = document.getElementById("root")!;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
