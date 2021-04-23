import { EditIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightAddon,
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
  Spacer,
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
  });

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
    } = editForm;

    let res = await swal({
      title: "Are you sure?",
      text: "You want to Update this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((res) => {
      if (res) {
        axios.put(`/admin/update/${id}`, {
          name,
          productCategoriesId,
          amount: +amount,
          price: +price,
          productStatus,
        });
        swal("Updated", {
          icon: "success",
        });
      }
    });
    onClose();
    window.location.reload();
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
                <option value="DELETE">DELETE</option>
              </Select>
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
                        marginRight="10px"
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
