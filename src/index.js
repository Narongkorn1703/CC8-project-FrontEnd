import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Fonts from "./styles/Fonts";
import { theme } from "./styles/theme";
import AuthContextProvider from "./context/AuthContextProvider";
import ProductContextProvider from "./context/ProductContextProvider";
import CartContextProvider from "./context/CartProductProvider";
import OrderPaymentContextProvider from "./context/OrderPaymentContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <OrderPaymentContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <AuthContextProvider>
              <ChakraProvider theme={theme}>
                <Fonts />
                <App />
              </ChakraProvider>
            </AuthContextProvider>
          </CartContextProvider>
        </ProductContextProvider>
      </OrderPaymentContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
