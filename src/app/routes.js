import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { ProductsPage } from "./pages/ProductsPage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { OffersPage } from "./pages/OffersPage";
const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "products", Component: ProductsPage },
      { path: "products/:id", Component: ProductDetailPage },
      { path: "offers", Component: OffersPage },
      { path: "about", Component: AboutPage },
      { path: "contact", Component: ContactPage }
    ]
  }
]);
export {
  router
};
