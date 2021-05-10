import React from "react";

import Footer from "../components/layouts/Footer";
import Headers from "../components/layouts/Headers";

import { useState } from "react";

import {
  Box,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/layout";

import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import GateWayPayment from "../components/layouts/GateWayPayment";
import axios from "../config/axios";
import swal from "sweetalert";
import { useHistory } from "react-router-dom";
// registerLocale("th", th);

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

function PaymentPage() {
  const handleCancel = async () => {
    await localStorage.removeItem("order");
    history.push("/");
  };
  const orderId = localStorage.getItem("order");
  const history = useHistory();
  function Redirect() {
    if (!orderId) return history.push("/");
  }
  const [inputOrder, setInputOrder] = useState({
    orderId,
    dateTime: "",
    namePayment: "",
    slipImgUrl: "",
  });
  const [file, setFile] = useState({ file: "" });
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputOrder((prev) => ({ ...prev, [name]: value }));
  };
  const handleOnChangeImage = (e) => {
    if (e.target.files[0]) {
      setFile({ file: URL.createObjectURL(e.target.files[0]) });
      setInputOrder((prev) => ({
        ...prev,
        slipImgUrl: e.target.files[0],
      }));
      // setFile(e.target.files[0]);
    } else {
      setFile({
        file: null,
      });
      setFile("");
    }
  };
  const handlePayment = async () => {
    console.log(inputOrder);
    const { dateTime, namePayment, slipImgUrl } = inputOrder;
    const myFormData = new FormData();
    myFormData.append("image", slipImgUrl);
    myFormData.append("dateTime", dateTime);
    myFormData.append("namePayment", namePayment);
    try {
      const res = await axios.patch(
        `/order/status/${orderId}`,
        myFormData
      );
      if (res) {
        localStorage.removeItem("order");
        swal(
          "Success",
          "Please wait we check your payment",
          "success"
        );
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Headers />
      {Redirect()}
      <Box minHeight="500px" bg="#FFFAF0" p="10px">
        <Grid templateColumns="repeat(8, 1fr)">
          <GridItem colStart="1" />
          <GateWayPayment />
          <GridItem colEnd="6" />
          <Box
            bg="#FFFFFF"
            borderRadius="6px"
            borderWidth="1px"
            padding="10px">
            <Text fontSize="2rem" mb="10px">
              PaymentForm
            </Text>
            <form>
              <FormControl m="2">
                <InputGroup>
                  <InputLeftAddon children={`OrderID : `} />
                  <Input
                    name="orderId"
                    value={orderId}
                    w="200px"
                    // onChange={handleOnChange}
                    // value={cloneP.name}
                    readOnly
                    // onChange={handleAddFormChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl m="2">
                <InputGroup>
                  <InputLeftAddon children={`Name : `} />
                  <Input
                    name="namePayment"
                    w="200px"
                    placeholder="NamePayment"
                    onChange={handleOnChange}
                  />
                </InputGroup>
              </FormControl>
              <FormControl m="2">
                <InputGroup>
                  <InputLeftAddon children={`DateTime : `} />
                  <Input
                    name="dateTime"
                    type="datetime-local"
                    onChange={handleOnChange}
                    w="180px"
                  />
                </InputGroup>
              </FormControl>
              <FormControl m="2">
                <FormLabel
                  borderRadius="6px"
                  borderWidth="1px"
                  textAlign="center"
                  padding="5px"
                  w="100px"
                  bg="#F1F1F1">
                  Choose File :
                </FormLabel>
                <Input
                  type="file"
                  p="1"
                  w="10px"
                  onChange={handleOnChangeImage}
                  style={{ display: "none" }}
                />
                <Image
                  mt="10px"
                  borderRadius="6px"
                  boxShadow="150px"
                  src={file.file}
                  fallbackSrc="https://via.placeholder.com/150"
                />
              </FormControl>
              <Stack
                direction="row"
                spacing={20}
                align="center"
                margin="10px"
                mt="20px">
                <Button
                  colorScheme="blue"
                  w="100px"
                  onClick={handlePayment}>
                  Payment
                </Button>

                <Button
                  w="100px"
                  colorScheme="red"
                  onClick={handleCancel}>
                  Cancel
                </Button>
              </Stack>
            </form>
          </Box>
        </Grid>
      </Box>

      <Footer />
    </div>
  );
}

export default PaymentPage;
