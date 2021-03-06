import React from "react";
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
import axios from "../../config/axios";
import { useState } from "react";
import { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import Swal from "sweetalert2";
import ModalAddProduct from "./ModalAddProduct";
import EditProduct from "../Admin/EditProduct";
function BodyProductAdmin() {
  const [products, setProducts] = useState([]);
  const getProduct = async () => {
    const res = await axios.get("/admin/getAll");
    setProducts(res.data.product);
  };
  useEffect(() => {
    getProduct();
  }, []);

  const handleDel = async (productId) => {
    console.log("delete");
    let response = await Swal.fire({
      title: "Are you sure?",
      text: 'You want to "Delete" this Item?',
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (response.isConfirmed) {
      await axios.patch(`/admin/delete/${productId}`);
      await Swal.fire(
        "Deleted!",
        "Your file has been deleted.",
        "success"
      ).then(() => getProduct());
    }
  };

  return (
    <>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th w="5%">ID</Th>
            <Th>Name</Th>
            <Th>Categories</Th>
            <Th>Amount</Th>
            <Th>Price/Unit</Th>

            <Th>Status</Th>
            <Th>ProductImage</Th>
            <Th>Manage</Th>
          </Tr>
        </Thead>
        {products?.map((product, idx) => {
          return (
            <Tbody key={idx}>
              <Tr>
                <Td fontSize="18">{idx + 1}</Td>
                <Td fontSize="18">{product.name}</Td>
                <Td fontSize="18">{product.ProductCategory.name}</Td>
                <Td fontSize="18">{product.amount}</Td>
                <Td fontSize="18">{product.price}</Td>
                <Td fontSize="18">{product.productStatus}</Td>
                <Td>
                  <Image
                    borderRadius="6px"
                    src={product.productImg}
                    fallbackSrc="https://via.placeholder.com/100"
                  />
                </Td>

                <Td>
                  <Box w="100%">
                    <EditProduct
                      getProduct={getProduct}
                      product={product}
                      productId={product.id}
                    />
                    {product.productStatus !== "DELETE" ? (
                      <DeleteIcon
                        color="#E53E3E"
                        fontSize="30"
                        onClick={() => handleDel(product.id)}
                        m="4"
                      />
                    ) : null}
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          );
        })}
      </Table>
      <ModalAddProduct getProduct={getProduct} />
    </>
  );
}

export default BodyProductAdmin;
