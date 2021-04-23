import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import axios from "../../config/axios";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState, useEffect } from "react";

import { FiFile } from "react-icons/fi";
import swal from "sweetalert";

function ModalAddProduct({ getProduct }) {
  const [type, setType] = useState([]);
  const [addProduct, setAddProduct] = useState({
    name: "",
    categories: "",
    amount: "",
    price: "",
  });

  const getCategories = async () => {
    const res = await axios.get("/admin/getall-categories");

    setType(res.data);
    console.log(type);
  };
  useEffect(() => {
    getCategories();
  }, []);

  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnAdd = (e) => {
    const { name, categories, amount, price } = addProduct;
    e.preventDefault();
    axios
      .post("/admin/addproduct", {
        name,
        categories,
        amount,
        price,
      })
      .then(() => {
        swal("Successfully", "Product Added", "success").then(
          (res) => {
            onClose();
          }
        );
      })
      .then(() => {
        getProduct();
      });
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();
  return (
    <>
      <Button
        onClick={onOpen}
        width="60px"
        height="60px"
        borderRadius="60%"
        colorScheme="green"
        style={{ position: "fixed", right: "15px", bottom: "30px" }}>
        <AiOutlineFileAdd size="28px" />
      </Button>
      <Modal
        finalFocusRef={finalRef}
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontWeight="semibold">AddProduct</ModalHeader>
          <ModalCloseButton _focus={{ boxShadow: "none" }} />
          <ModalBody pb={8}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <Input
                ref={initialRef}
                name="name"
                placeholder="Product Name"
                onChange={handleAddFormChange}
              />
            </FormControl>
            <Flex pb="2" marginTop="5">
              <FormControl>
                <FormLabel id="categories">Categories</FormLabel>
                <Select
                  w="150px"
                  isRequired={true}
                  name="categories"
                  onChange={handleAddFormChange}
                  placeholder="Categories">
                  {type?.map((item, id) => (
                    <option key={id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl marginLeft="10">
                <FormLabel>Amount</FormLabel>
                <NumberInput
                  size="md"
                  maxW={999}
                  defaultValue={1}
                  min={1}
                  w="80px">
                  <NumberInputField
                    name="amount"
                    onChange={handleAddFormChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Flex>
            <Flex>
              <FormControl>
                <FormLabel>Price/Unit</FormLabel>
                <NumberInput
                  size="md"
                  precision={2}
                  min={1}
                  width="100px"
                  defaultValue={0.0}>
                  <NumberInputField
                    name="price"
                    onChange={handleAddFormChange}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>ProductImage</FormLabel>
                <InputGroup>
                  <Flex borderWidth="1px" borderRadius="4">
                    <InputLeftElement
                      pointerEvents="none"
                      children={
                        <Icon
                          as={FiFile}
                          fontSize="20"
                          marginLeft="14px"
                          color="#CBD5E0"
                        />
                      }
                      width="20%"
                    />
                    <Spacer />
                    <Button
                      marginLeft="10"
                      colorScheme="linkedin"
                      width="60%">
                      UploadFile
                    </Button>
                  </Flex>
                </InputGroup>
              </FormControl>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleOnAdd}
              _focus={{ outline: "none" }}>
              Submit
            </Button>
            <Button
              colorScheme="red"
              _focus={{ outline: "none" }}
              onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAddProduct;
