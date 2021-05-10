import React from "react";
import { Box, Divider, Flex, Text } from "@chakra-ui/layout";
import {
  StatNumber,
  Stat,
  Image,
  Button,
  Spacer,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { useContext } from "react";
import { CartContext } from "../../context/CartProductProvider";
import swal from "sweetalert";
function BoxProducts({
  name,
  status,
  amount,
  productImg,
  price,
  type,
  productId,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [value, setValue] = useState(1);
  const { cart, setCart, setProductCart, productCart } = useContext(
    CartContext
  );

  function handleMinus() {
    return value !== 1 ? setValue(value - 1) : value;
  }
  function handleAdd() {
    setValue(value + 1);
  }

  const handleAddCart = (
    productId,
    name,
    status,
    value,
    productImg,
    price,
    type
  ) => {
    const index = cart?.findIndex(
      (cart) => cart.productId === productId
    );
    // const inCart = [...cart];
    // console.log(inCart);

    if (index === -1) {
      setCart([
        ...cart,
        {
          productId,
          name,
          status,
          value,
          productImg,
          price,
          type,
        },
      ]);
      setProductCart([
        ...productCart,
        { productId, quantity: value },
      ]);
    } else {
      let newCart = [
        ...cart,
        {
          productId,
          name,
          status,
          value,
          productImg,
          price,
          type,
        },
      ];
      let newProductCart = [
        ...productCart,
        { productId, quantity: value },
      ];
      newProductCart[index].quantity.value = value;
      newCart[index].value = value;
      setCart(newCart);
      setProductCart(newProductCart);
    }

    onClose();
    swal({
      title: `Added Product ${name}`,
      text: ` จำนวน ${value} ต้น ลงในตะกร้าแล้ว`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Box
        as="button"
        bg="#FFFFFF"
        height="320px"
        m="6"
        p="4"
        w="20%"
        onClick={onOpen}
        borderRadius="6px"
        borderWidth="1px"
        overflow="hidden">
        <Flex flexDirection="column">
          <Image
            src={productImg}
            fallbackSrc="https://via.placeholder.com/150"
            p="1"
            w="65%"
            h="170px"
            margin="auto"
            borderRadius="6px"
          />
          <Text fontSize="16">Product: {name}</Text>
          <Text fontSize="16">Status: {status}</Text>
          <Text fontSize="16">Category: {type}</Text>
          <Stat>
            <StatNumber>{price} TH</StatNumber>
          </Stat>
        </Flex>
      </Box>

      <Modal
        size={"xl"}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ProductDetail</ModalHeader>
          <Divider width="98%" margin="auto" />
          <ModalCloseButton />
          <ModalBody pb={10}>
            <Flex w="100%">
              <Image
                src={productImg}
                fallbackSrc="https://via.placeholder.com/150"
                p="1"
                w="50%"
                margin="auto"
                borderRadius="6px"
              />
              <Spacer />
              <div>
                <Text m="3" p="2" fontSize="12">
                  ProductName : {name}
                </Text>
                <Divider />
                <Text m="3" p="2" fontSize="12">
                  Categories : {type}
                </Text>
                <Text m="3" p="2" fontSize="12">
                  Price/Unit : {price}
                </Text>
                <Text m="3" p="2" fontSize="12">
                  Amount : {amount}
                </Text>

                <Box p="4" w="100%">
                  <Button
                    w="30%"
                    h="35px"
                    onClick={handleAdd}
                    colorScheme="blue"
                    disabled={value === amount}>
                    <AddIcon />
                  </Button>
                  <Box style={{ display: "inline-block" }}>
                    <Text w="35px" textAlign="center">
                      {value}
                    </Text>
                  </Box>
                  <Button
                    w="30%"
                    h="35px"
                    onClick={handleMinus}
                    colorScheme="red">
                    <MinusIcon />
                  </Button>
                </Box>
              </div>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() =>
                handleAddCart(
                  productId,
                  name,
                  status,
                  value,
                  productImg,
                  price,
                  type
                )
              }
              colorScheme="blue"
              margin="10px"
              marginRight="30px">
              Add Product
            </Button>

            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BoxProducts;
