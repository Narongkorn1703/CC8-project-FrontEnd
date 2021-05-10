import React, { createContext, useState } from "react";

export const CartContext = createContext();
function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const ClearCart = () => {
    setCart([]);
  };
  const [productCart, setProductCart] = useState([]);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        ClearCart,
        productCart,
        setProductCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;
