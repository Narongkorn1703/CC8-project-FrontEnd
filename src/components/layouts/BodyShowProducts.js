import { Box, Link, Flex } from "@chakra-ui/layout";
import React, { useEffect, useState } from "react";
import axios from "../../config/axios";
import BoxProducts from "./BoxProducts";

function BodyShowProducts() {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    const res = await axios.get("/products/getall-products");
    setProducts(res.data.product);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <Box style={{ width: "100%" }} h="auto" bg="#FFFFF0">
        <div>
          <Link
            href="#"
            fontSize="20"
            bgColor="#38A189"
            color="#FFFFFF"
            borderRadius="6px"
            m="6"
            p="1"
            style={{ textDecoration: "none" }}>
            Show Products
          </Link>
          <Flex w="100%" flexWrap="wrap">
            {products.map((item, id) => (
              <BoxProducts
                key={id}
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
