import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import axios from "../../config/axios";
import date from "date-and-time";

function AdminPaymentBody() {
  const [payment, setPayment] = useState([]);
  const getPayment = async () => {
    const res = await axios.get("/admin/get-allpayment");
    setPayment(res.data.orders);
  };
  useEffect(() => {
    getPayment();
  }, []);
  console.log(payment);
  //   const d = new Date("2020-01-01 04:40:10");
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="10%">Order ID</Th>
            <Th>TotalPrice</Th>

            <Th>DateTime</Th>
            <Th>Customer</Th>
            <Th>PaymentStatus</Th>
            <Th>Slip Image</Th>
            <Th>Manage</Th>
          </Tr>
        </Thead>
        {payment?.map((item, id) => {
          const d = new Date(item.dateTime);
          const dateFormat = date.format(
            d,
            " MMM DD YYYY,  ddd hh:mm "
          );
          return (
            <Tbody key={id}>
              <Tr>
                <Td fontSize="16">{item.id + 1000}</Td>
                <Td fontSize="16">{item.totalPrice}</Td>
                <Td fontSize="16">{dateFormat}</Td>
                <Td fontSize="16">{`${item.User.firstName} ${item.User.lastName}`}</Td>
                <Td fontSize="16">{item.paymentStatus}</Td>
                <Td>
                  <Image
                    borderRadius="6px"
                    src={item.productImg}
                    fallbackSrc="https://via.placeholder.com/100"
                  />
                </Td>

                <Td>
                  <Box w="100%"></Box>
                </Td>
              </Tr>
            </Tbody>
          );
        })}
      </Table>
    </>
  );
}

export default AdminPaymentBody;
