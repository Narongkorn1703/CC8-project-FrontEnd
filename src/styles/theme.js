import { extendTheme } from "@chakra-ui/react";
import Button from "./Button";
import Box from "./Box";
export const theme = extendTheme({
  styles: {
    global: {
      "html , body": {
        padding: 0,
        margin: 0,
        fontSize: 12,
        color: "primary.200",
      },
      "#": {
        boxSizing: "border-box",
      },
    },
  },
  colors: {
    primary: {
      200: "#424642",
      100: "#536162",
    },
    secondary: "#C06014",
    highlight: {
      100: "#F27B19",
    },
    muted: {
      300: "#F3F4ED",
      200: "#FCFCFC",
      100: "#FFFFFF",
    },
    search: {
      100: "#3182CE",
    },
    bgHeader: {
      100: "#EEEEEE",
    },
    Input: {
      100: "#F8F8F8",
    },
    headButton: {
      100: "#F8F8F8",
    },
  },
  fonts: {
    heading: "Open Sans",
    body: "Open Sans",
  },
  components: {
    Button,
    Box,
  },
});
