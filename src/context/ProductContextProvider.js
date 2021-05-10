import React, { createContext, useEffect, useState } from "react";
import axios from "../config/axios";

export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const getProducts = async () => {
    const res = await axios.get("/products/getall-products");
    setProducts(res.data.product);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        searchResult,
        setSearchResult,
        getProducts,
      }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductContextProvider;
