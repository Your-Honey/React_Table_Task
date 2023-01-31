import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useFormik } from "formik";
import validationSchema from "../yupvalidation";
import "./form.css";

const theme = createTheme();

const initialValues = {
  email: "",
  password: "",
  about: "",
};

export default function RegisterForm({
  addDetail,
  editData,
  details,
  editDetail,
}) {
  const onSubmit = (values) => {
    const emailCheck = details.find(
      (detail) => detail.email.toLowerCase() === values.email.toLowerCase()
    );
    if (emailCheck && !editData) {
      window.alert("Email Already Exit");
      return null;
    }
    const data = {
      email: values.email,
      password: values.password,
      about: values.about,
    };
    if (editData) {
      data.id = editData.id;
      data.createdAt = editData.createdAt;
      data.showPassword = editData.showPassword;
      data.showText = editData.showPassword;
      editDetail(data);
    } else {
      data.id = new Date().toLocaleString();
      data.createdAt = new Date().toLocaleString();
      data.showPassword = false;
      data.showText = false;
      addDetail([...details, data]);
    }

    resetForm();
  };
  console.log("form");
  React.useEffect(() => {
    if (editData) {
      setFieldValue("email", editData.email);
      setFieldValue("password", editData.password);
      setFieldValue("about", editData.about);
    }
  }, [editData]);

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    errors,
    touched,
    resetForm,
  } = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  {...getFieldProps("email")}
                />
                {errors.email && touched.email ? (
                  <div className="error">{errors.email}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...getFieldProps("password")}
                />
                {errors.password && touched.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="about"
                  minRows={2}
                  style={{ width: 400 }}
                  name="about"
                  required
                  id="about"
                  {...getFieldProps("about")}
                />
                {errors.about && touched.about ? (
                  <div className="error">{errors.about}</div>
                ) : null}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {editData ? "Update" : "Add"}
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
