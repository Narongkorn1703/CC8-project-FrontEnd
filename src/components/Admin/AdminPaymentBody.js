import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Box,
  Button,
  Grid,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import axios from "../../config/axios";

import Swal from "sweetalert2";
function AdminPaymentBody() {
  const [payment, setPayment] = useState([]);
  const getPayment = async () => {
    const res = await axios.get("/admin/get-allpayment");
    setPayment(res.data.orders);
  };
  useEffect(() => {
    getPayment();
  }, []);
  const handleConfirmed = async (id) => {
    console.log("Confirmed Payment", id);
    let response = await Swal.fire({
      title: "Are you sure?",
      text: 'You want to "Update" this Status?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    });
    if (response.isConfirmed) {
      await axios.patch(`/admin/payment-update/${id}`);
      await Swal.fire(
        "StatusUpdate!",
        "This Status has been deleted.",
        "success"
      );
      await setTimeout(() => window.location.reload(), 1000);
    }
  };
  const handleReject = async (id) => {
    console.log("Rejected", id);
    let response = await Swal.fire({
      title: "Are you sure?",
      text: 'You want to "Reject" this Status?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    });
    if (response.isConfirmed) {
      await axios.patch(`/admin/payment-reject/${id}`);
      await Swal.fire(
        "StatusUpdate!",
        "This Status has been Reject.",
        "success"
      );
      await setTimeout(() => window.location.reload(), 1000);
    }
  };
  //   const d = new Date("2020-01-01 04:40:10");
  console.log(payment);
  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="10%">Order ID</Th>
            <Th>TotalPrice</Th>

            <Th>DateTime</Th>
            <Th>Customer-Order</Th>
            <Th>Name-Payment</Th>
            <Th>PaymentStatus</Th>
            <Th>Slip Image</Th>
            <Th>Manage</Th>
          </Tr>
        </Thead>
        {payment?.map((item, id) => {
          const d = new Date(item.dateTime);
          var options = {
            weekday: "short",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          };
          const dateFormat = d.toLocaleDateString("th-TH", options);
          return (
            <Tbody key={id}>
              <Tr>
                <Td fontSize="16">{item.id}</Td>
                <Td fontSize="16">{item.totalPrice}</Td>
                <Td fontSize="16">{dateFormat}</Td>
                <Td fontSize="16">{`${item.User.firstName} ${item.User.lastName}`}</Td>
                <Td fontSize="16">{item.namePayment}</Td>
                <Td fontSize="16">{item.paymentStatus}</Td>
                <Td>
                  <Image
                    borderRadius="6px"
                    src={item.slipImgUrl}
                    fallbackSrc="https://via.placeholder.com/100"
                  />
                </Td>

                {item.paymentStatus === "PENDING" && (
                  <Td>
                    <Box w="100%">
                      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                        <Button
                          colorScheme="green"
                          onClick={() => handleConfirmed(item.id)}>
                          Confirm
                        </Button>
                        <Button
                          colorScheme="red"
                          onClick={() => handleReject(item.id)}>
                          Reject
                        </Button>
                      </Grid>
                    </Box>
                  </Td>
                )}
              </Tr>
            </Tbody>
          );
        })}
      </Table>
    </>
  );
}

export default AdminPaymentBody;
