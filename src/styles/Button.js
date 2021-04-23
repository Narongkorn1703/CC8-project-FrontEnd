const button = {
  baseStyle: {
    fontWeight: "400",
    ":focus": {
      boxShadow: "none",
      outline: "none",
    },
  },
  size: {
    sm: {
      minWidth: "150px",
      fontSize: "sm",
      padding: "4",
    },
    md: {
      minWidth: "150px",
      fontSize: "md",
      padding: "6",
    },
    lg: {
      fontSize: "lg",
      padding: "8",
      minWidth: "150px",
    },
  },
  variants: {
    primary: {
      bg: "primary.200",
      color: "white",

      ":hover": {
        bg: "primary.100",
      },
      ":focus": {
        boxShadow: "none",
      },
    },
    search: {
      bg: "search.100",
    },
    headButton: {
      bg: "headButton.100",
      h: 14,
      m: 6,
      fontSize: 18,
      ":focus": {
        boxShadow: "none",
      },
    },
  },
  defaultProps: {},
};
export default button;
