import React, { useState, useContext } from "react";
import axios from "../../config/axios";
import {
  getToken,
  setToken,
} from "../../services/localStorageService";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

import {
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Box,
  InputRightElement,
  InputGroup,
  // Divider,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContextProvider";
import JwtDecode from "jwt-decode";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

function RegisterLogin({ onClose, initialRef }) {
  const [input, setInput] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    tel: "",
  });
  const history = useHistory();
  const { setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormLogin, setIsFormLogin] = useState(false);
  const [show, setShow] = useState(false);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
    if (name === "email") {
      if (!value) {
        setError((prev) => ({ ...prev, email: "Email is required" }));
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          value
        )
      ) {
        setError((prev) => ({
          ...prev,
          email: "Invalid Email ",
        }));
      }
    }
  };
  const handleOnRegister = async (e) => {
    const {
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      tel,
    } = input;
    e.preventDefault();
    try {
      const res = await axios.post("/register", {
        email,
        firstName,
        lastName,
        password,
        confirmPassword,
        tel,
      });

      await swal("Success", "Thanks", "success");
      setToken(res.data.token);
      setIsAuthenticated(true);
      let token = await JwtDecode(getToken());

      await localStorage.setItem(
        "User",
        `${token.firstName} ${token.lastName}`
      );
      await localStorage.setItem("role", `${token.role}`);

      await history.push("/Homepage");
      window.location.reload();
    } catch (err) {
      if (err.response) {
        setError({ server: err.message });
      } else {
        setError({ front: err.message });
      }
      if (error === "Request failed with status code 500") {
        setError({ err: "This Email is used" });
      }
      swal("Oops", `${err}`, "error");

      console.dir(err);
    }
  };

  ////LOGIN

  const validateInput = () => {
    const newError = {};
    if (!email) newError.email = "Email is required bitch!";
    if (!password) newError.password = "Password is required bitch!";
    setError(newError);
  };
  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();
      validateInput();
      const response = await axios.post("/login", {
        email,
        password,
      });
      console.log("Login");
      setIsAuthenticated(true);
      setToken(response.data.token);
      let token = await JwtDecode(getToken());

      await localStorage.setItem(
        "User",
        `${token.firstName} ${token.lastName}`
      );
      await localStorage.setItem("role", `${token.role}`);
      if (token.role === "ADMIN") {
        history.push("/admin-product");
      } else {
        history.push("/Homepage");
      }
      swal(
        "Login Successfully",
        `Welcome ${token.firstName} ${token.lastName}`,
        "success"
      ).then(onClose);
    } catch (err) {
      console.dir(err);
      if (err.message === "Request failed with status code 400") {
        let err = "Email or password is not correct";
        return swal("Oops", `${err}`, "error");
      }
    }
  };
  const handleClick = () => setShow(!show);
  return (
    <>
      <div id="fb-root"></div>
      <script
        async
        defer
        crossorigin="anonymous"
        src="https://connect.facebook.net/th_TH/sdk.js#xfbml=1&version=v10.0&appId=2448840655347620&autoLogAppEvents=1"
        nonce="sEM9ljl8"></script>
      <ModalOverlay />
      {isFormLogin ? (
        <ModalContent>
          <ModalHeader fontWeight="bold">
            Create your account
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <FormControl isRequired>
              <FormLabel fontWeight="bold">First name</FormLabel>
              <Input
                name="firstName"
                ref={initialRef}
                placeholder="First name"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Last name</FormLabel>
              <Input
                name="lastName"
                placeholder="Last name"
                onChange={handleInputChange}
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                placeholder="@gmail.com"
                onChange={handleInputChange}
              />
              {error.email && (
                <span>
                  <Box bg="danger.100"></Box>
                </span>
              )}
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  name="password"
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  onChange={handleInputChange}
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <ViewOffIcon onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </ViewOffIcon>
                  ) : (
                    <ViewIcon onClick={handleClick}>
                      {show ? "Show" : "Hide"}
                    </ViewIcon>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>ConfirmPassword</FormLabel>
              {/* viewpassword */}
              <InputGroup>
                <Input
                  name="confirmPassword"
                  placeholder="ConfirmPassword"
                  type={show ? "text" : "password"}
                  onChange={handleInputChange}
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <ViewOffIcon onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </ViewOffIcon>
                  ) : (
                    <ViewIcon onClick={handleClick}>
                      {show ? "Show" : "Hide"}
                    </ViewIcon>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Tel</FormLabel>

              <Input
                name="tel"
                tpye="tel"
                placeholder="phoneNumber"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              p={2}
              m={5}
              style={{ backgroundColor: "#FFFFFF" }}
              _focus={{ boxShadow: "none" }}
              onClick={() => setIsFormLogin(false)}>
              Already have account?
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              type="submit"
              onClick={handleOnRegister}>
              Register
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      ) : (
        <ModalContent>
          <ModalHeader fontWeight="bold">Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8}>
            <FormControl mt={4}>
              <FormLabel>Email</FormLabel>
              <Input
                placeholder="xxx_xxxx@gmail.com"
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  placeholder="Password"
                  type={show ? "text" : "password"}
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  {show ? (
                    <ViewOffIcon onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </ViewOffIcon>
                  ) : (
                    <ViewIcon onClick={handleClick}>
                      {show ? "Show" : "Hide"}
                    </ViewIcon>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              p={2}
              m={5}
              style={{ backgroundColor: "#FFFFFF" }}
              _focus={{ boxShadow: "none" }}
              onClick={() => setIsFormLogin(true)}>
              Don't have account?
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleOnSubmit}>
              Login
            </Button>

            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      )}
    </>
  );
}

export default RegisterLogin;
