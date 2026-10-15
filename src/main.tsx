import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";
import App from "./App";
import LegalPage from "./LegalPage";

const path = window.location.pathname.replace(/(?:\/index\.html|\/)?$/, "/");
const page = path.endsWith("/politica-de-privacidade/")
  ? <LegalPage kind="privacy" />
  : path.endsWith("/termos-de-uso/")
    ? <LegalPage kind="terms" />
    : <App />;

const app = (
  <StrictMode>
    {page}
  </StrictMode>
);
const root = document.getElementById("root")!;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
