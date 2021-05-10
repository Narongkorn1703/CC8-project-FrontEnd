import { Redirect, Route, Switch } from "react-router-dom";
import AdminManangePage from "./pages/AdminManangePage";
import AdminPayment from "./pages/AdminPayment";
import Homepage from "./pages/Homepage";
import PaymentPage from "./pages/PaymentPage";
import ProductsPage from "./pages/ProductsPage";
import { AuthContext } from "./context/AuthContextProvider";
import { useContext, useEffect } from "react";
import ResultSearchPage from "./pages/ResultSearchPage";
import ResultSearchAdminPage from "./pages/ResultSearchAdminPage";

const privateRoutes = [
  {
    path: "/Homepage",
    component: Homepage,
  },
  {
    path: "/products",
    component: ProductsPage,
  },
  {
    path: "/payment",
    component: PaymentPage,
  },
  {
    path: "/search-result",
    component: ResultSearchPage,
  },
];
const adminRoutes = [
  {
    path: "/Homepage",
    component: Homepage,
  },
  {
    path: "/admin-product",
    component: AdminManangePage,
  },
  {
    path: "/admin-payment",
    component: AdminPayment,
  },
  {
    path: "/search-admin",
    component: ResultSearchAdminPage,
  },
  {
    path: "/search-result",
    component: ResultSearchPage,
  },
];
const publicRoutes = [
  {
    path: "/Homepage",
    component: Homepage,
  },
  {
    path: "/products",
    component: ProductsPage,
  },

  {
    path: "/search-result",
    component: ResultSearchPage,
  },
];
function App() {
  const { isAuthenticated } = useContext(AuthContext);
  const user = localStorage.getItem("role");

  return (
    <Switch>
      {user?.role !== "ADMIN" &&
        adminRoutes.map((route, index) => (
          <Route
            key={index}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      {isAuthenticated &&
        privateRoutes.map((route, index) => (
          <Route
            key={index}
            exact
            path={route.path}
            component={route.component}
          />
        ))}
      {!isAuthenticated &&
        publicRoutes.map((route, index) => (
          <Route
            key={index}
            exact
            path={route.path}
            component={route.component}
          />
        ))}

      <Redirect to="/Homepage" />
    </Switch>
  );
}

export default App;
