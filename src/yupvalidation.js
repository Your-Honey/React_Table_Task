import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Invalid email format").required("Required"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ),
  about: yup.string().required("Required"),
});

export default validationSchema;
