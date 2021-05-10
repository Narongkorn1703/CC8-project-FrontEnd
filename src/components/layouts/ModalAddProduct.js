import React from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
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
  useDisclosure,
} from "@chakra-ui/react";

import axios from "../../config/axios";
import { AiOutlineFileAdd } from "react-icons/ai";
import { useState, useEffect } from "react";

import swal from "sweetalert";
import { FiFile } from "react-icons/fi";
// import { useContext } from "react";
// import { ProductContext } from "../../context/ProductContextProvider";

function ModalAddProduct() {
  // const { getProducts } = useContext(ProductContext);
  const [file, setFile] = useState({ file: "" });
  const [type, setType] = useState([]);
  const [addProduct, setAddProduct] = useState({
    name: "",
    categories: "",
    amount: "",
    price: "",
    productImg: "",
  });

  const getCategories = async () => {
    const res = await axios.get("/admin/getall-categories");

    setType(res.data);
    console.log(type);
  };
  useEffect(() => {
    getCategories();
  }, []);
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile({ file: URL.createObjectURL(e.target.files[0]) });
      setAddProduct((prev) => ({
        ...prev,
        productImg: e.target.files[0],
      }));
      // setFile(e.target.files[0]);
    } else {
      setFile({
        file: null,
      });
      setFile("");
    }
  };
  const handleAddFormChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnAdd = (e) => {
    const {
      name,
      categories,
      amount,
      price,
      productImg,
    } = addProduct;
    e.preventDefault();
    // if (productImg === "") {
    //   return axios
    //     .post("/admin/addproduct", {
    //       name,
    //       categories,
    //       amount,
    //       price,
    //       productImg,
    //     })
    //     .then(() => {
    //       swal("Successfully", "Product Added", "success").then(
    //         (res) => {
    //           onClose();
    //         }
    //       );
    //     })
    //     .then(() => {
    //       setTimeout(() => window.location.reload(), 1000);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // } else {
    const myFormData = new FormData();
    myFormData.append("name", name);
    myFormData.append("categories", categories);
    myFormData.append("amount", amount);
    myFormData.append("price", price);
    myFormData.append("image", productImg);

    axios
      .post("/admin/addproduct", myFormData)
      .then(() => {
        swal("Successfully", "Product Added", "success").then(
          (res) => {
            onClose();
          }
        );
      })
      .then(() => {
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
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
          <form>
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
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel>ProductImage</FormLabel>
                <InputGroup>
                  <InputRightElement
                    pointerEvents="none"
                    children={
                      <Icon
                        as={FiFile}
                        fontSize="20"
                        color="#CBD5E0"
                      />
                    }
                    width="20%"
                  />
                  <Input
                    p="2px"
                    pl="4px"
                    type="file"
                    onChange={handleChange}
                  />
                </InputGroup>
                {file !== "" && (
                  <Image
                    mt="10px"
                    borderRadius="6px"
                    src={file.file}
                    boxShadow="150px"
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                )}
              </FormControl>
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
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModalAddProduct;
