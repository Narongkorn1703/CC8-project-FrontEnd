import {
  Box,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { ReactComponent as Logo } from "./kasikornbank-logo-vector.svg";
function GateWayPayment() {
  return (
    <>
      <Box
        bg="#FFFFFF"
        width="400px"
        borderWidth="1px"
        borderRadius="6px">
        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
          <GridItem colStart="1" />
          <Box>
            <Image
              src="https://iconape.com/wp-content/files/kh/209583/svg/209583.svg"
              boxSize="150px"
            />
            <InputGroup>
              <InputLeftAddon children={`ID-Banking `} />
              <Input value="301-118-9985-XXXX" readOnly w="150px" />
            </InputGroup>
          </Box>
          <GridItem colStart="1" />
          <Box>
            <Logo style={{ height: "150px" }} />
            <InputGroup>
              <InputLeftAddon children={`ID-Banking `} />
              <Input value="001-599-965-XXXX" readOnly w="140px" />
            </InputGroup>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default GateWayPayment;
