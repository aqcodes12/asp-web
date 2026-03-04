import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useDocumentDirection } from "./i18n/useDocumentDirection";

function App() {
  useDocumentDirection();

  return <RouterProvider router={router} />;
}
export {
  App as default
};
