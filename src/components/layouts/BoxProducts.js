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

function BoxProducts({
  name,
  status,
  amount,
  productImg,
  price,
  type,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  const [value, setValue] = useState(1);

  function handleMinus() {
    return value !== 1 ? setValue(value - 1) : value;
  }
  function handleAdd() {
    setValue(value + 1);
  }

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
            w="70%"
            margin="auto"
            borderRadius="6px"
          />
          <Text fontSize="16">Product: {name}</Text>
          <Text fontSize="16">Status: {status}</Text>
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
          <ModalCloseButton />
          <ModalBody pb={10}>
            <Flex w="100%">
              <Image
                src=""
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
                  Amount : {amount}
                </Text>

                <Box p="4" w="100%">
                  <Button
                    w="30%"
                    onClick={handleAdd}
                    disabled={value === amount}>
                    <AddIcon />
                  </Button>
                  <Box style={{ display: "inline-block" }}>
                    <Text w="10" textAlign="center">
                      {value}
                    </Text>
                  </Box>
                  <Button w="30%" onClick={handleMinus}>
                    <MinusIcon />
                  </Button>
                </Box>
              </div>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Add Product
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BoxProducts;
