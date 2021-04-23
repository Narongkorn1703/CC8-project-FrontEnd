import React from "react";
import BodyCarousel from "./BodyCarousel";
import BodyHomepage from "./BodyHomepage";
import BodyShowProducts from "./BodyShowProducts";

function BodyHome() {
  return (
    <>
      <BodyCarousel />
      {/* <Badge fontSize="26px"> ProductsType</Badge> */}

      <BodyHomepage />
      <BodyShowProducts />
    </>
  );
}

export default BodyHome;
