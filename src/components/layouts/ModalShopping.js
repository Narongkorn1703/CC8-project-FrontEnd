import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useContext } from "react";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { CartContext } from "../../context/CartProductProvider";
import axios from "../../config/axios";
import swal from "sweetalert";
function ModalShopping() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { cart, setCart, ClearCart, productCart } = useContext(
    CartContext
  );
  const history = useHistory();
  function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toUTCString();
    document.cookie =
      cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  const handleOrderItem = async () => {
    console.log(productCart);
    if (total === 0) {
      return swal(
        "Error cart is empty",
        "Pls add something before Order",
        "error"
      );
    }
    try {
      const res = await axios.post("/order/order-request", {
        totalPrice: total,
        OrderProductLists: productCart,
      });
      if (res) {
        console.log(res);
        await localStorage.setItem("order", res.data.orders.id);
        setCookie("orderId", `${res.data.orders.id}`, 10);
        await swal("Order Success", "", "success");
        history.push("/payment");
      }
    } catch (err) {
      console.log(err);
    }
  };
  let total = cart.reduce(
    (total, product) => total + product.price * product.value,
    0
  );

  let amount = cart.reduce(
    (amount, product) => amount + product.value,
    0
  );
  const deleteProductFromCart = (id) => {
    const newCart = { ...cart };
    const deletedItem = cart.find((item) => item.productId === id);
    if (!deletedItem) return;
    newCart.items = cart.filter((item) => item.productId !== id);

    setCart(newCart.items);
  };
  return (
    <>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="6xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>List Product in Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <Box borderWidth="1px" borderRadius="6px">
                <Flex margin="10px" padding="6px">
                  <Text>ProductName</Text>
                  <Spacer />
                  <Text>Price/Unit</Text>
                  <Spacer />
                  <Text>Amount</Text>
                  <Spacer />
                  <Text>TotalPrice</Text>
                </Flex>
              </Box>
              <br></br>
              <Box
                borderWidth="1px"
                borderRadius="6px"
                minHeight="300px">
                <Flex flexDirection="column">
                  {cart.length === 0 ? (
                    <Center>
                      <Text
                        fontSize="20px"

                        // pos="fixed"
                        // top="280px"
                        // left="680px"
                      >
                        Cart is empty please Add before order
                      </Text>
                    </Center>
                  ) : (
                    cart?.map((cart, idx) => {
                      return (
                        <Box key={idx}>
                          <Grid
                            templateColumns="repeat(4, 1fr)"
                            gap={20}
                            margin="2px"
                            padding="6px">
                            <div>
                              <Flex>
                                <Image
                                  src={cart.productImg}
                                  fallbackSrc="https://via.placeholder.com/60"
                                  p="1"
                                  marginRight="8px"
                                  w="50%"
                                  borderRadius="6px"
                                />
                                <Text
                                  w="100%"
                                  marginTop="24px"
                                  style={{ display: "inline" }}>
                                  {cart.name}
                                </Text>
                              </Flex>
                            </div>

                            <Text
                              w="100%"
                              marginTop="24px"
                              textAlign="center">
                              {cart.price}
                            </Text>
                            <Box>
                              <Text
                                w="100%"
                                marginTop="24px"
                                textAlign="center">
                                {cart.value}
                              </Text>
                            </Box>

                            <Text
                              w="100%"
                              marginTop="24px"
                              marginLeft="76px">
                              {cart.value * cart.price}
                              <DeleteIcon
                                color="#E53E3E"
                                marginLeft="18px"
                                padding="1px"
                                fontSize="18px"
                                onClick={() =>
                                  deleteProductFromCart(
                                    cart.productId
                                  )
                                }
                              />
                            </Text>
                          </Grid>
                          <Divider />
                        </Box>
                      );
                    })
                  )}
                </Flex>
                {cart.length !== 0 ? (
                  <Grid templateColumns="repeat(10, 1fr)" m="10px">
                    <GridItem colStart={5} />
                    <Text
                      fontSize="1.5rem"
                      onClick={ClearCart}
                      _hover={{
                        color: "#3182CE",
                      }}>
                      ClearCart
                    </Text>
                  </Grid>
                ) : null}
              </Box>
            </Box>

            <Box
              marginTop="4px"
              borderWidth="1px"
              borderRadius="6px"
              minHeight="30px">
              <Flex margin="10px" padding="6px">
                <Text>TotalList: {cart.length}</Text>
                <Spacer />
                <Text></Text>
                <Spacer />
                <Text>TotalAmount: {amount}</Text>
                <Spacer />
                <Text>TotalPrice: {total} THB</Text>
              </Flex>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleOrderItem}
              marginRight="40px">
              Order
            </Button>
            <Button colorScheme="red" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Button
        onClick={onOpen}
        width="60px"
        height="60px"
        borderRadius="60%"
        colorScheme="green"
        _focus={{ outline: "none" }}
        style={{ position: "fixed", right: "15px", bottom: "30px" }}>
        <AiOutlineShoppingCart size="28" />
        {cart.length !== 0 ? (
          <Box
            colorScheme="red"
            borderWidth="1px"
            borderRadius="50%"
            borderColor="red.500"
            bg="red.500"
            width="18px"
            height="18px"
            pos="fixed"
            right="15px"
            bottom="70px">
            <Text>{cart.length}</Text>
          </Box>
        ) : null}
      </Button>
    </>
  );
}

export default ModalShopping;
