// import { Box, Flex } from "@chakra-ui/layout";
import React from "react";
import BodyHomepage from "./BodyHomepage";
import BodyShowProducts from "./BodyShowProducts";
import ModalShopping from "./ModalShopping";

function BodyProducts() {
  return (
    <>
      <BodyHomepage />
      <BodyShowProducts />
      <ModalShopping />
    </>
  );
}

export default BodyProducts;
