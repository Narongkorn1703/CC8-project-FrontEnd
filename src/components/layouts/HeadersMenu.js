import * as Scroll from "react-scroll";

import { Button, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import JwtDecode from "jwt-decode";
import { getToken } from "../../services/localStorageService";
import { useState } from "react";

let scroll = Scroll.animateScroll;
function HeadersMenu() {
  const [user, setUser] = useState(null);
  let decodeTk;
  const getUser = async () => {
    try {
      decodeTk = JwtDecode(getToken());
      await setUser(decodeTk);
    } catch (error) {
      // invalid token format
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const history = useHistory();

  const scrollToButtom = () => {
    scroll.scrollToBottom();
  };

  const handleHomepage = () => {
    history.push("/homepage");
  };
  const handleProducts = () => {
    history.push("/products");
  };
  const handleAllProducts = () => {
    history.push("/admin-product");
  };
  const handlePaymentStatus = () => {
    history.push("/admin-payment");
  };
  const handlePayment = () => {
    history.push("/payment");
  };

  return (
    <>
      <Flex justifyContent="center" bg="#F0FFF4">
        <Button
          m="8"
          h="14"
          w="15%"
          colorScheme="teal"
          onClick={handleHomepage}>
          HomePage
        </Button>

        {user?.role !== "ADMIN" ? (
          <Button
            m="8"
            h="14"
            w="15%"
            colorScheme="green"
            onClick={handleProducts}>
            Products
          </Button>
        ) : (
          <Button
            m="8"
            h="14"
            w="15%"
            colorScheme="green"
            onClick={handleAllProducts}>
            AllProducts
          </Button>
        )}

        {user?.role !== "ADMIN" ? (
          <Button
            m="8"
            h="14"
            w="15%"
            colorScheme="facebook"
            onClick={handlePayment}>
            Payment
          </Button>
        ) : (
          <Button
            m="8"
            h="14"
            w="15%"
            colorScheme="facebook"
            onClick={handlePaymentStatus}>
            PaymentStatus
          </Button>
        )}

        <Button
          m="8"
          h="14"
          w="15%"
          colorScheme="whatsapp"
          onClick={scrollToButtom}>
          Contact Us
        </Button>
      </Flex>

      <hr></hr>
    </>
  );
}

export default HeadersMenu;
