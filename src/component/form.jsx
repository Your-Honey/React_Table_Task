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

export default function RegisterForm({ addDetail, editId, details }) {
  const onSubmit = (values) => {
    const data = {
      email: values.email,
      password: values.password,
      about: values.about,
      id: new Date().toLocaleString(),
      createdAt: new Date().toLocaleString(),
    };
    console.log(data);
    resetForm();
    addDetail([...details, data]);
  };

  React.useEffect(() => {
    if (editId) {
      const dataToEdit = details.find((d) => d.id === editId);
      initialValues.email = dataToEdit.email;
      initialValues.password = dataToEdit.password;
      initialValues.about = dataToEdit.about;
    }
  }, [editId]);

  const { handleSubmit, getFieldProps, errors, touched, resetForm } = useFormik(
    {
      initialValues,
      onSubmit,
      validationSchema,
    }
  );

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
              {editId ? "Update" : "Add"}
            </Button>
            <Grid container justifyContent="flex-end"></Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}