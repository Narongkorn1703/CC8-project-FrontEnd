import { Badge, Box, Flex, Link, Image } from "@chakra-ui/react";
import React from "react";

function BodyHomepage() {
  return (
    <Box style={{ width: "100%" }} h="300px" bg="#FFFFF0">
      <div>
        <Link
          href="#"
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
        <div width="20%">
          <Badge
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
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618903183/pexels-nothing-ahead-3064152_2_zozuzm.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>

        <div width="20%">
          <Badge
            fontSize="16px"
            color="#FAF089"
            borderRadius="6px"
            bg="#975A16"
            style={{ marginTop: "8px" }}>
            ไม้ผล
          </Badge>
          <Box
            as="button"
            p={4}
            width="100%"
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618904155/pexels-ryan-baker-129574_zxev5m.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
        <div width="20%">
          <Badge
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
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618904008/pexels-mariola-3699859_v4dxta.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
        <div width="20%">
          <Badge
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
            _focus={{ border: "none", outline: "none" }}>
            <Image
              src="https://res.cloudinary.com/risingnova/image/upload/v1618904267/pexels-craig-adderley-1858198_cimggj.jpg"
              borderRadius="10px"
            />
          </Box>
        </div>
      </Flex>
    </Box>
  );
}

export default BodyHomepage;
