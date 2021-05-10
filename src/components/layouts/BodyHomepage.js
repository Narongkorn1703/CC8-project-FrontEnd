import { Badge, Box, Flex, Link, Image } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { ProductContext } from "../../context/ProductContextProvider";

function BodyHomepage() {
  const history = useHistory();
  const { products, setSearchResult } = useContext(ProductContext);

  const handleTypeMaiDok = async () => {
    const result = await products?.filter((item) => {
      return item.ProductCategory.name === "ไม้ดอก";
    });
    console.log(result);
    await setSearchResult(result);
    await history.push("/search-result");
  };
  const handleTypeFruit = async () => {
    const result = await products?.filter((item) => {
      return item.ProductCategory.name === "ไม้ผล";
    });
    await setSearchResult(result);
    await history.push("/search-result");
  };
  const handleTypeIndoor = async () => {
    const result = await products?.filter((item) => {
      return item.ProductCategory.name === "ไม้ในร่ม";
    });
    await setSearchResult(result);
    await history.push("/search-result");
  };
  const handleTypeIvy = async () => {
    const result = await products?.filter((item) => {
      return item.ProductCategory.name === "ไม้เลื้อย";
    });
    await setSearchResult(result);
    await history.push("/search-result");
  };
  const handleTypePlants = async () => {
    const result = await products?.filter((item) => {
      return item.ProductCategory.name === "ไม้ประดับ";
    });
    await setSearchResult(result);
    await history.push("/search-result");
  };
  const handleShowProducts = () => {
    history.push("/products");
  };
  return (
    <Box style={{ width: "100%" }} h="300px" bg="#FFFFF0">
      <div>
        <Link
          onClick={handleShowProducts}
          fontSize="20"
          bgColor="#38A189"
          color="#FFFFFF"
          borderRadius="6px"
          m="6"
          p="1"
          style={{ textDecoration: "none" }}>
          ProductCategories
        </Link>
      </div>
      <Flex justifyContent="center">
        <div width="10%">
          <Badge
            p="5px"
            fontSize="16px"
            color="#FAF089"
            borderRadius="6px"
            bg="#975A16"
            style={{ marginTop: "8px" }}>
            ไม้ดอก
          </Badge>
          <Box
            p={4}
            width="100%"
            as="button"
            onClick={handleTypeMaiDok}
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618903183/pexels-nothing-ahead-3064152_2_zozuzm.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>

        <div width="10%">
          <Badge
            p="5px"
            fontSize="16px"
            color="#FAF089"
            borderRadius="6px"
            bg="#975A16"
            style={{ marginTop: "8px" }}>
            ไม้ผล
          </Badge>
          <Box
            as="button"
            onClick={handleTypeFruit}
            p={4}
            width="100%"
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1620558940/rgkwqklpjktalwo9ten2.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
        <div width="10%">
          <Badge
            p="5px"
            fontSize="16px"
            color="#FAF089"
            borderRadius="6px"
            bg="#975A16"
            style={{ marginTop: "8px" }}>
            ไม้ในร่ม
          </Badge>
          <Box
            p={4}
            width="100%"
            as="button"
            onClick={handleTypeIndoor}
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618904008/pexels-mariola-3699859_v4dxta.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
        <div width="10%">
          <Badge
            p="5px"
            fontSize="16px"
            color="#FAF089"
            borderRadius="6px"
            bg="#975A16"
            style={{ marginTop: "8px" }}>
            ไม้เลื้อย
          </Badge>
          <Box
            p={4}
            width="100%"
            as="button"
            onClick={handleTypeIvy}
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618904267/pexels-craig-adderley-1858198_cimggj.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
        <div width="10%">
          <Badge
            p="5px"
            fontSize="16px"
            color="#FAF089"
            borderRadius="6px"
            bg="#975A16"
            style={{ marginTop: "8px" }}>
            ไม้ประดับ
          </Badge>
          <Box
            p={4}
            width="100%"
            as="button"
            onClick={handleTypePlants}
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1620584776/sai_gdtaaz.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
      </Flex>
    </Box>
  );
}

export default BodyHomepage;
