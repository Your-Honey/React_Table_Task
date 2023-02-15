import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import RegisterForm from "../component/form";

const addDetail = jest.fn();
const editDetail = jest.fn();
const details = [
  {
    id: 1,
    email: "example1@email.com",
    password: "password@E2",
    about: "About me 1",
    createdAt: "01/02/2022, 11:07:52",
    showPassword: false,
    showText: false,
    checkBoxValue: false,
  },
  {
    id: 2,
    email: "example2@email.com",
    password: "password@E2",
    about: "About me 2 to long texttttttttttttttttttttttttttttt",
    createdAt: "01/02/2023, 11:07:52",
    showPassword: false,
    showText: false,
    checkBoxValue: false,
  },
];
const editData = {
  id: 2,
  email: "example2@email.com",
  password: "password@E2",
  about: "About me 2 to long texttttttttttttttttttttttttttttt",
  createdAt: "01/02/2023, 11:07:52",
  showPassword: false,
  showText: false,
  checkBoxValue: false,
};
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

test("Button Text should be Update When edit data is passed", () => {
  render(<RegisterForm editData={editData} />);
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
          id: expect.any(Date),
          createdAt: expect.any(Date),
          showPassword: false,
          showText: false,
          checkBoxValue: false,
        },
      ]);
    },
    { timeout: 4100 }
  );
});

test("Password input should be masked", () => {
  render(<RegisterForm />);
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.change(passwordInput, { target: { value: "Password@12345" } });
  expect(passwordInput.value).toBe("Password@12345");
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("Alert on email already exist", async () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation();
  render(
    <RegisterForm details={details} editData={null} addDetail={addDetail} />
  );
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "example1@email.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "Password@12345" },
  });
  fireEvent.change(screen.getByPlaceholderText("about"), {
    target: { value: "Demo about" },
  });
  fireEvent.click(screen.getByText("Add"));
  await waitFor(() => {
    expect(alertMock).toHaveBeenCalledTimes(1);
  });
});

test("sumbit the data with correct edit input values", async () => {
  render(
    <RegisterForm
      editData={editData}
      details={details}
      editDetail={editDetail}
    />
  );

  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "change2@gmail.com" },
  });
  fireEvent.click(screen.getByText("Update"));
  await waitFor(
    () => {
      expect(editDetail).toHaveBeenCalledWith({
        id: 2,
        email: "change2@gmail.com",
        password: "password@E2",
        about: "About me 2 to long texttttttttttttttttttttttttttttt",
        createdAt: "01/02/2023, 11:07:52",
        showPassword: false,
        showText: false,
        checkBoxValue: false,
      });
    },
    { timeout: 4000 }
  );
});

test("Should Show password when click on eye", () => {
  render(<RegisterForm />);
  const eyeIcon = screen.getByText("visibility");
  const passwordInput = screen.getByLabelText("Password");
  fireEvent.click(eyeIcon);
  expect(passwordInput).toHaveAttribute("type", "text");
});
