import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "../component/form";

const addDetail = jest.fn();

test("Should render email Input Box", () => {
  render(<RegisterForm />);
  const emailInput = screen.getByLabelText("Email Address");
  expect(emailInput).toBeInTheDocument();
});

test("Should render password Input Box", () => {
  render(<RegisterForm />);
  const PasswordInput = screen.getByLabelText("Password");
  expect(PasswordInput).toBeInTheDocument();
});

test("Should render about Input Area", () => {
  render(<RegisterForm />);
  const aboutInput = screen.getByPlaceholderText("about");
  expect(aboutInput).toBeInTheDocument();
});

test("Button Text should be Add When no edit data is passed", () => {
  render(<RegisterForm editData={null} />);
  const textOnButton = screen.getByText("Add");
  expect(textOnButton).toBeInTheDocument();
});

test("Button Text should be Update When no edit data is passed", () => {
  render(
    <RegisterForm
      editData={{
        id: 2,
        email: "bradtraversy@gmail.com",
        password: "1234567890",
        showPassword: false,
        about: "It long established ",
        showText: false,
        createdAt: "01/02/2022, 11:07:52",
        checkBoxValue: false,
      }}
    />
  );
  const textOnButton = screen.getByText("Update");
  expect(textOnButton).toBeInTheDocument();
});

test("Should be able to type in email input", () => {
  render(<RegisterForm />);
  const emailInput = screen.getByLabelText("Email Address");
  fireEvent.change(emailInput, { target: { value: "demo@gmail.com" } });
  expect(emailInput.value).toBe("demo@gmail.com");
});

test("Should Show Password Validation", async () => {
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText("Password");
  const addButton = screen.getByText("Add");
  fireEvent.change(passwordInput, { target: { value: "12345567" } });
  fireEvent.click(addButton);
  await waitFor(() => {
    expect(
      screen.getByText(
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      )
    ).toBeInTheDocument();
  });
});

test("submits the form with correct input values", async () => {
  render(<RegisterForm addDetail={addDetail} editData={null} details={[]} />);
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "demo@gmail.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "Password@12345" },
  });
  fireEvent.change(screen.getByPlaceholderText("about"), {
    target: { value: "Demo about" },
  });
  fireEvent.click(screen.getByText("Add"));
  await waitFor(
    () => {
      expect(addDetail).toHaveBeenCalledWith([
        {
          email: "demo@gmail.com",
          password: "Password@12345",
          about: "Demo about",
          id: expect.any(String),
          createdAt: expect.any(String),
          showPassword: false,
          showText: false,
          checkBoxValue: false,
        },
      ]);
    },
    { timeout: 4000 }
  );
});

test("Password input should be masked", () => {
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Password@12345" } });
  expect(passwordInput.value).toBe("Password@12345");
  expect(passwordInput).toHaveAttribute("type", "password");
});

// test("displays error message if email already exists", async () => {
//   render(
//     <RegisterForm
//       editData={null}
//       details={[
//         {
//           email: "test1@example.com",
//           password: "testpassword",
//           about: "test about",
//           id: "1",
//           createdAt: "2022-02-06T17:22:47.364Z",
//           showPassword: false,
//           showText: false,
//           checkBoxValue: false,
//         },
//       ]}
//     />
//   );

//   fireEvent.change(screen.getByLabelText("Email Address"), {
//     target: { value: "test1@example.com" },
//   });
//   fireEvent.change(screen.getByLabelText("Password"), {
//     target: { value: "passwordA@123" },
//   });
//   fireEvent.change(screen.getByPlaceholderText("about"), {
//     target: { value: "Demo test to Add in about" },
//   });

//   fireEvent.click(screen.getByText("Add"));
//   await waitFor(() => {
//     expect(window.alert).toHaveBeenCalledWith("Email Already Exit");
//   });
// });
