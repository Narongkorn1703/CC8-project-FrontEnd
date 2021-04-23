import { Image, Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function BodyCarousel() {
  return (
    <>
      <Flex justifyContent="center" w="100%" bg="#FFFAF0">
        <div style={{ width: "60%", padding: "3%" }}>
          <Carousel
            showArrows={true}
            showStatus={false}
            autoPlay={true}
            showThumbs={false}>
            <Box>
              <Image src="https://res.cloudinary.com/risingnova/image/upload/v1618898323/pexels-lina-kivaka-4482677_5_upxniy.jpg" />
            </Box>
            <Box>
              <Image src="https://res.cloudinary.com/risingnova/image/upload/v1618899302/pexels-pixabay-158028_1_e8hule.jpg" />
            </Box>
            <Box>
              <Image src="https://res.cloudinary.com/risingnova/image/upload/v1618901274/pexels-irina-iriser-1408221_zanqbg.jpg" />
            </Box>
          </Carousel>
        </div>
      </Flex>
    </>
  );
}

export default BodyCarousel;
