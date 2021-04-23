import React from "react";

import Headers from "../components/layouts/Headers";
import Footer from "../components/layouts/Footer";
import ModalShopping from "../components/layouts/ModalShopping";
import { Divider } from "@chakra-ui/layout";
import BodyHome from "../components/layouts/BodyHome";

function Homepage() {
  return (
    <>
      <Headers />
      <BodyHome />
      <Divider />
      <Footer />
      <ModalShopping />
    </>
  );
}

export default Homepage;
