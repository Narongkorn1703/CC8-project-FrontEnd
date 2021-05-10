import { Box, Link, Flex } from "@chakra-ui/layout";
import React, { useContext, useEffect } from "react";
import axios from "../../config/axios";
import { ProductContext } from "../../context/ProductContextProvider";
import BoxProducts from "./BoxProducts";

function BodyShowProducts() {
  const { products, setProducts } = useContext(ProductContext);

  const getProduct = async () => {
    const res = await axios.get("/products/getall-products");
    setProducts(res.data.product);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Box w="100%" h="auto" bg="#FFFFF0">
        <div>
          <Link
            href="#"
            fontSize="20"
            bgColor="#38A189"
            color="#FFFFFF"
            borderRadius="6px"
            m="6"
            p="2"
            position="relative"
            top="10px"
            style={{ textDecoration: "none" }}>
            Show Products
          </Link>
          <Flex w="100%" flexWrap="wrap" padding="6px">
            {products.map((item, id) => (
              <BoxProducts
                key={id}
                productId={item.id}
                type={item.ProductCategory.name}
                name={item.name}
                status={item.productStatus}
                amount={item.amount}
                productImg={item.productImg}
                price={item.price}
              />
            ))}
          </Flex>
        </div>
      </Box>
    </>
  );
}

export default BodyShowProducts;
