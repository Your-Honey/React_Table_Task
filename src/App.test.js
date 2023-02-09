import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

test("renders table component", () => {
  render(<App />);
  const searchInput = screen.getByPlaceholderText("Search...");
  expect(searchInput).toBeInTheDocument();
});

test("renders form component", () => {
  render(<App />);
  const PasswordInput = screen.getByLabelText("Password");
  expect(PasswordInput).toBeInTheDocument();
});

test("Data Added through Form should show in table", async () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText("Email Address"), {
    target: { value: "demo@gmail.com" },
  });
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "12345567@Adfs" },
  });
  fireEvent.change(screen.getByPlaceholderText("about"), {
    target: { value: "Demo text for about" },
  });
  fireEvent.click(screen.getByText("Add"));
  const tableRow = await waitFor(
    async () => await screen.findByText("demo@gmail.com"),
    {
      timeout: 3000,
    }
  );

  expect(tableRow).toBeInTheDocument();
});
