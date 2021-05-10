import { Modal, useDisclosure } from "@chakra-ui/react";
import React from "react";
import RegisterLogin from "../Auth/RegisterLogin";
import HeadersMenu from "../layouts/HeadersMenu";
import HeadingToolAdminPayment from "./HeadingToolAdminPayment";

function HeaderAdminPayment() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();
  const finalRef = React.useRef();

  return (
    <>
      <HeadingToolAdminPayment onOpen={onOpen} />
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}>
        <RegisterLogin
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      </Modal>
      <hr></hr>
      <HeadersMenu />
    </>
  );
}

export default HeaderAdminPayment;
