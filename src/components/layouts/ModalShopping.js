import { Button } from "@chakra-ui/react";
import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";

function ModalShopping() {
  return (
    <>
      <Button
        width="60px"
        height="60px"
        borderRadius="60%"
        colorScheme="green"
        _focus={{ outline: "none" }}
        style={{ position: "fixed", right: "15px", bottom: "30px" }}>
        <AiOutlineShoppingCart size="28" />
      </Button>
    </>
  );
}

export default ModalShopping;
