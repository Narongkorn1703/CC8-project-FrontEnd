import React from "react";
import { useDisclosure, Modal } from "@chakra-ui/react";
import HeadersMenu from "./HeadersMenu";
import RegisterLogin from "../Auth/RegisterLogin";
import HeadingTool from "./HeadingTool";
function Headers() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <HeadingTool onOpen={onOpen} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <RegisterLogin
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        />
      </Modal>
      <hr></hr>
      <HeadersMenu />
    </>
  );
}

export default Headers;
