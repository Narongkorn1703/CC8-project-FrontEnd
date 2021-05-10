import { Box, Flex, Link, Text } from "@chakra-ui/layout";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import BodyHomepage from "../components/layouts/BodyHomepage";
import BoxProducts from "../components/layouts/BoxProducts";
import Footer from "../components/layouts/Footer";
import Headers from "../components/layouts/Headers";
import ModalShopping from "../components/layouts/ModalShopping";
import { ProductContext } from "../context/ProductContextProvider";

function ResultSearchPage() {
  const { searchResult } = useContext(ProductContext);
  const history = useHistory();

  const handleShowProducts = () => {
    history.push("/products");
  };
  return (
    <>
      <Headers />

      <Box w="100%" h="auto" bg="#FFFFF0">
        <BodyHomepage />
        {searchResult === [] ? (
          <Box h="500px">
            <Flex justifyContent="center">
              <Text fontSize="40px">This Product is not found</Text>
            </Flex>
          </Box>
        ) : (
          <div>
            <Link
              onClick={handleShowProducts}
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
              {searchResult?.map((item, id) => (
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
        )}
      </Box>
      <ModalShopping />
      <Footer />
    </>
  );
}

export default ResultSearchPage;
