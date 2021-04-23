import { Redirect, Route, Switch } from "react-router-dom";
import AdminManangePage from "./pages/AdminManangePage";
import AdminPayment from "./pages/AdminPayment";
import Homepage from "./pages/Homepage";
import PaymentPage from "./pages/PaymentPage";
import ProductsPage from "./pages/ProductsPage";
import { AuthContext } from "./context/AuthContextProvider";
import { useContext } from "react";
const privateRoutes = [
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
    path: "/payment",
    component: PaymentPage,
  },
];
function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthContext
  );
  return (
    <Switch>
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
