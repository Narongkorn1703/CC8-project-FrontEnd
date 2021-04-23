import React from "react";
import { Flex, Text, Spacer, Link } from "@chakra-ui/layout";
import { EmailIcon } from "@chakra-ui/icons";
import { AiFillFacebook } from "react-icons/ai";
function FooterContent() {
  return (
    <>
      <Text fontSize="20" p="5">
        Contact Us
      </Text>
      <Flex>
        <Text p="5">Address: </Text>
        <Text p="5">Nontaburi SaiMaa</Text>
        <br></br>
        <Text p="5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Praesentium tempore, similique expedita reprehenderit sit
          nobis cum laboriosam totam. Quas aliquam soluta quo
          excepturi ullam vel deleniti, autem blanditiis sit
          reprehenderit.
        </Text>
        <Spacer />

        <div>
          <Text p="6">
            <AiFillFacebook size="30" />
            <Link href="https://www.facebook.com/dom.narongkorn">
              Dom Narongkorn
            </Link>
          </Text>
        </div>
        <div>
          <Text p="6">
            <EmailIcon w="10" h="10" m="2" />
            RisingNova@gmail.com
          </Text>
        </div>
      </Flex>
    </>
  );
}

export default FooterContent;
