let error;
const validateName = (value) => {
  if (!value) {
    error = "firstName is required";
  }
  return error;
};
const validateLastName = (value) => {
  if (!value) {
    error = "firstName is required";
  }
  return error;
};
const validateEmail = (value) => {
  if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      value
    )
  ) {
    error = "Email is required";
  }
  return error;
};
const validatePassword = (value) => {
  if (value.length < 6) {
    error = "password length must be more than 6 ";
  }
};
export {
  validateEmail,
  validateLastName,
  validateName,
  validatePassword,
};
