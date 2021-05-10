import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FiFile } from "react-icons/fi";
import axios from "../../config/axios";
import swal from "sweetalert";
function EditProduct({ getProduct, product, productId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef();
  const [cloneP, setCloneP] = useState({ ...product });
  const [editForm, setEditForm] = useState({
    name: `${cloneP.name}`,
    productCategoriesId: `${cloneP.productCategoriesId}`,
    amount: `${cloneP.amount}`,
    price: `${cloneP.price}`,
    productStatus: `${cloneP.productStatus}`,
    productImg: `${cloneP.productImg}`,
  });
  const handleOnChangeFile = (e) => {
    if (e.target.files[0]) {
      setEditForm((cur) => ({
        ...cur,
        productImg: e.target.files[0],
      }));
      setCloneP((cur) => ({
        ...cur,
        productImg: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setEditForm((cur) => ({
        ...cur,
        productImg: null,
      }));
      setEditForm("");
    }
  };

  const [type, setType] = useState([]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setEditForm((cur) => ({ ...cur, [name]: value }));
    setCloneP((cur) => ({ ...cur, [name]: value }));
    // console.log(editForm.productCategoriesId);
  };
  const handleOnSubmitEditForm = async (id) => {
    const {
      name,
      productCategoriesId,
      amount,
      price,
      productStatus,
      productImg,
    } = editForm;
    console.log(editForm);
    const myFormData = new FormData();
    myFormData.append("name", name);
    myFormData.append("productCategoriesId", productCategoriesId);
    myFormData.append("amount", amount);
    myFormData.append("price", price);
    myFormData.append("image", productImg);
    myFormData.append("productStatus", productStatus);
    const res = await swal({
      title: "Are you sure?",
      text: "You want to Update this product?",
      icon: "warning",
      buttons: ["Cancel", true],
    });
    if (res) {
      await axios.put(`/admin/update/${id}`, myFormData);
      await swal("Updated", {
        text: `Update Product: ${name}`,
        icon: "success",
      });

      await onClose();
      await setTimeout(() => window.location.reload(), 500);
    }
  };
  const getCategories = async () => {
    const res = await axios.get("/admin/getall-categories");
    setType(res.data);
  };
  useEffect(() => {
    getCategories();
    getProduct();
  }, []);
  const handleOnClose = async () => {
    setCloneP({ ...product });
    return onClose();
  };

  return (
    <>
      <EditIcon fontSize="34" color="#319795" onClick={onOpen} />

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>EditProduct</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={8}>
            <FormControl>
              <FormLabel>Product Name</FormLabel>
              <InputGroup>
                <InputLeftAddon
                  children={`productID : ${cloneP.id}`}
                />
                <Input
                  name="name"
                  placeholder="Product Name"
                  onChange={handleOnChange}
                  value={cloneP.name}

                  // onChange={handleAddFormChange}
                />
              </InputGroup>
            </FormControl>
            <Flex pb="2" marginTop="5">
              <FormControl>
                <FormLabel id="categories">Categories</FormLabel>
                <Select
                  w="150px"
                  isRequired={true}
                  name="productCategoriesId"
                  onChange={handleOnChange}
                  placeholder={product.ProductCategory.name}>
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
                  min={1}
                  w="80px"
                  value={cloneP.amount}>
                  <NumberInputField
                    name="amount"
                    onChange={handleOnChange}
                  />
                </NumberInput>
              </FormControl>
            </Flex>
            <Flex>
              <FormControl pb="4">
                <FormLabel>Price/Unit</FormLabel>
                <InputGroup>
                  <NumberInput
                    size="md"
                    precision={2}
                    min={1}
                    width="100px"
                    value={cloneP.price}>
                    <NumberInputField
                      name="price"
                      onChange={handleOnChange}
                    />
                  </NumberInput>
                  <InputRightAddon children="THB" />
                </InputGroup>
              </FormControl>
            </Flex>

            <FormControl pb="4">
              <FormLabel>ProductStatus</FormLabel>
              <Select
                w="150px"
                value={
                  product.productStatus !== editForm.productStatus
                    ? cloneP.productStatus
                    : editForm.productStatus
                }
                name="productStatus"
                onChange={(e) => handleOnChange(e)}>
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="OutStock">OutStock</option>
                {/* <option value="DELETE">DELETE</option> */}
              </Select>
            </FormControl>

            <FormControl>
              <FormLabel>ProductImage</FormLabel>
              <InputGroup>
                <InputRightElement
                  pointerEvents="none"
                  children={
                    <Icon as={FiFile} fontSize="20" color="#CBD5E0" />
                  }
                  width="20%"
                />

                <Input
                  padding="1"
                  pl="2"
                  type="file"
                  onChange={handleOnChangeFile}
                />
              </InputGroup>
              <Image
                mt="10px"
                borderRadius="6px"
                src={cloneP.productImg}
                boxShadow="150px"
                fallbackSrc="https://via.placeholder.com/150"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleOnSubmitEditForm(productId)}>
              Submit
            </Button>

            <Button colorScheme="red" onClick={handleOnClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EditProduct;
