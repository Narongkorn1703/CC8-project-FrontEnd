import React, { useContext } from "react";
import {
  Button,
  Flex,
  Spacer,
  Input,
  Link,
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContextProvider";
import { FaUser } from "react-icons/fa";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  getToken,
  clearToken,
} from "../../services/localStorageService";
import JwtDecode from "jwt-decode";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from "../../config/axios";
import { ProductContext } from "../../context/ProductContextProvider";
import swal from "sweetalert";
function HeadingTool({ onOpen }) {
  const { setIsAuthenticated } = useContext(AuthContext);
  const [inputSearch, setInputSearch] = useState("");
  const user = localStorage.getItem("User");
  const [users, setUsers] = useState(null);
  const { setSearchResult, searchResult } = useContext(
    ProductContext
  );

  let decodeTk;
  const getUser = async () => {
    try {
      decodeTk = await JwtDecode(getToken());
      await setUsers(decodeTk);
    } catch (error) {
      // invalid token format
    }
  };
  const handleOnChangeInputSearch = (e) => {
    setInputSearch(e.target.value);
    console.log(e.target.value);
  };
  const handleAdminButtonSearch = async () => {
    console.log(inputSearch);
    const keyword = `keyword=${inputSearch}`;

    const res = await axios.get(`/admin/get?${keyword}`);
    setSearchResult(res.data.products);
    console.log(res.data.products);
    console.log(searchResult);
    history.push("/search-admin");
  };

  const handleUserButtonSearch = async () => {
    const keyword = `keyword=${inputSearch}`;

    if (inputSearch === "") {
      const response = await axios.get(`/products/search?${keyword}`);
      setSearchResult(response.data.products);
      return history.push("/search-result");
    }
    const res = await axios.get(`/products/search?${keyword}`);
    setSearchResult(res.data.products);

    history.push("/search-result");
  };

  useEffect(() => {
    getUser();
  }, []);

  const history = useHistory();
  const LogOutHandler = async () => {
    const res = await swal({
      title: "You want to Logout ?",
      icon: "warning",
      dangerMode: true,
      buttons: true,
    });
    if (res) {
      await swal("LogOut! Successfully", "", "success");
      await clearToken();
      await localStorage.clear();
      await setIsAuthenticated(false);
      history.push("/");
      window.location.reload();
    }
  };

  return (
    <>
      <Flex>
        <Link
          href="#"
          style={{ fontSize: 30, textDecoration: "none" }}
          p="4"
          w="40%"
          fontWeight="bold">
          GreenLike
        </Link>
        <Spacer />
        <Input
          onChange={handleOnChangeInputSearch}
          style={{ marginRight: 10 }}
          placeholder="Name , Type  or etc"
          m="6"
          w="20%"
          bg="Input.100"
        />
        {users?.role === "ADMIN" ? (
          <Button
            m="6"
            w="8%"
            type="submit"
            onClick={handleAdminButtonSearch}
            style={{ marginLeft: 10 }}
            colorScheme="blue"
            _focus={{ boxShadow: "none" }}
            fontWeight="semibold">
            Search
          </Button>
        ) : (
          <Button
            m="6"
            w="8%"
            type="submit"
            onClick={handleUserButtonSearch}
            style={{ marginLeft: 10 }}
            colorScheme="blue"
            _focus={{ boxShadow: "none" }}
            fontWeight="semibold">
            Search
          </Button>
        )}
        {!user ? (
          <Button
            m="6"
            w="12%"
            colorScheme="green"
            _focus={{
              boxShadow:
                "0 0 1px 2px rgba(0, 201, 69, 1), 0 1px 1px rgba(0, 0, 0, .15)",
            }}
            onClick={onOpen}
            fontWeight="semibold">
            Register/Login
          </Button>
        ) : (
          <Box
            as="button"
            m="6"
            w="15%"
            colorScheme="green"
            borderWidth="1px"
            borderRadius="4px"
            _focus={{
              boxShadow: "none",
              outline: "none",
            }}
            fontWeight="semibold">
            <Flex w="100%" flexWrap="wrap" justifyContent="center">
              <FaUser
                size="24"
                color="#68D391"
                width="20%"
                style={{ marginLeft: "10px" }}
              />

              <Spacer />

              <Menu w="80%">
                {({ isOpen }) => (
                  <>
                    <MenuButton isactive={isOpen} w="70%">
                      <Flex>
                        <Text
                          w="auto"
                          p="1"
                          style={{ marginLeft: "10px" }}>
                          {`${user}`}
                        </Text>
                        <Spacer />
                        {isOpen ? (
                          <CloseIcon
                            fontSize="10"
                            position="relative"
                            right="5px"
                            top="7px"
                            style={{ marginRight: "10px" }}
                          />
                        ) : (
                          <ChevronDownIcon
                            fontSize="26"
                            style={{ marginRight: "5px" }}
                          />
                        )}
                      </Flex>
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={LogOutHandler}>
                        LogOut
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </Flex>
          </Box>
        )}
      </Flex>
    </>
  );
}

export default HeadingTool;
