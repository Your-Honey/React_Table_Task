import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DataTable from "../component/table";

const details = [
  {
    id: 1,
    email: "example1@email.com",
    password: "password1",
    about: "About me 1",
    createdAt: "2022-01-01T01:00:00.000Z",
    showPassword: false,
    showText: false,
    checkBoxValue: false,
  },
  {
    id: 2,
    email: "example2@email.com",
    password: "password2",
    about: "About me 2 to long texttttttttttttttttttttttttttttt",
    createdAt: "2022-01-02T01:00:00.000Z",
    showPassword: false,
    showText: false,
    checkBoxValue: false,
  },
];

const removeMutipleDetail = jest.fn();
const setDataEditTo = jest.fn();
const addDataOnDemand = jest.fn();
const removeDetail = jest.fn();

test("renders without crashing", () => {
  render(
    <DataTable
      details={details}
      removeMutipleDetail={removeMutipleDetail}
      setDataEditTo={setDataEditTo}
      addDataOnDemand={addDataOnDemand}
      removeDetail={removeDetail}
    />
  );
});

it("displays the table headers", () => {
  render(
    <DataTable
      details={details}
      removeMutipleDetail={removeMutipleDetail}
      setDataEditTo={setDataEditTo}
      addDataOnDemand={addDataOnDemand}
      removeDetail={removeDetail}
    />
  );

  expect(screen.getByText("Email")).toBeInTheDocument();
  expect(screen.getByText("Password")).toBeInTheDocument();
  expect(screen.getByText("About")).toBeInTheDocument();
  expect(screen.getByText("Created At")).toBeInTheDocument();
});

test("Should render search Input Box", () => {
  render(<DataTable details={[]} />);
  const searchInput = screen.getByPlaceholderText("Search...");
  expect(searchInput).toBeInTheDocument();
});

test("Should show No Data Message when details don't have data", () => {
  render(<DataTable details={[]} />);
  const noDataMessage = screen.getByText(/No Data/i);
  expect(noDataMessage).toBeInTheDocument();
});

test("Should render data passed as props to table component", async () => {
  render(<DataTable details={details} />);
  const inputEmail = await waitFor(() =>
    screen.findByText("example1@email.com")
  );
  expect(inputEmail).toBeInTheDocument();
});

test("Should show more option to read full about", async () => {
  render(<DataTable details={details} />);
  const moreText = await screen.findByText("more");
  expect(moreText).toBeInTheDocument();
});

test("Should show less option when clicked on more", async () => {
  render(<DataTable details={details} />);
  const moreText = await screen.findByText("more");
  fireEvent.click(moreText);
  const lessText = await screen.findByText("less");
  expect(lessText).toBeInTheDocument();
});

test("Showing ****** and lock img to hide password", async () => {
  render(<DataTable details={details} />);
  const password = await screen.findAllByText("****************");
  const lockImg = await screen.findAllByText("lock");

  expect(password.length).toBe(2);
  expect(lockImg.length).toBe(2);
});
