/* eslint-disable testing-library/no-wait-for-side-effects */
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import DataTable from "../component/table";

describe("Table test", () => {
  let details = [
    {
      id: 1,
      email: "example1@email.com",
      password: "password1",
      about: "About me 1",
      createdAt: "01/02/2022, 11:07:52",
      showPassword: false,
      showText: false,
      checkBoxValue: false,
    },
    {
      id: 2,
      email: "example2@email.com",
      password: "password2",
      about: "About me 2 to long texttttttttttttttttttttttttttttt",
      createdAt: "01/02/2023, 11:07:52",
      showPassword: false,
      showText: false,
      checkBoxValue: false,
    },
  ];

  const setDataEditTo = jest.fn();
  const removeMutipleDetail = jest.fn();
  const addDataOnDemand = jest.fn();
  const removeDetail = jest.fn();

  beforeEach(() => {
    details = [
      {
        id: 1,
        email: "example1@email.com",
        password: "password1",
        about: "About me 1",
        createdAt: "01/02/2022, 11:07:52",
        showPassword: false,
        showText: false,
        checkBoxValue: false,
      },
      {
        id: 2,
        email: "example2@email.com",
        password: "password2",
        about: "About me 2 to long texttttttttttttttttttttttttttttt",
        createdAt: "01/02/2023, 11:07:52",
        showPassword: false,
        showText: false,
        checkBoxValue: false,
      },
    ];
  });

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

  test("displays the table headers", () => {
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

  test("Should render data after sorting by CreatedAt in asc order", async () => {
    render(<DataTable details={details} />);
    await waitFor(async () => {
      const email1 = await screen.findByTestId("email-1");
      const email2 = await screen.findByTestId("email-2");
      expect(email1).toHaveTextContent("example2@email.com");
      // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
      expect(email2).toHaveTextContent("example1@email.com");
    });
  });

  test("Date sort should Work", async () => {
    render(<DataTable details={details} />);
    const dateSort = await screen.findByTestId("date-sort");

    await waitFor(
      () => {
        // eslint-disable-next-line testing-library/no-wait-for-side-effects
        fireEvent.click(dateSort);
        const email1 = screen.getByTestId("email-1");
        expect(email1).toHaveTextContent("example1@email.com");
      },
      { timeout: 1000 }
    );
  });

  test("Searching should work", async () => {
    render(<DataTable details={details} />);
    const searchInput = screen.getByPlaceholderText("Search...");
    fireEvent.change(searchInput, { target: { value: "example1@email.com" } });
    await waitFor(() => {
      const email1 = screen.getByTestId("email-1");
      expect(email1).toHaveTextContent("example1@email.com");
    });
  });

  test("Edit Button Should Work", (done) => {
    render(<DataTable details={details} setDataEditTo={setDataEditTo} />);
    setTimeout(() => {
      const dropDown = screen.getAllByTestId("threeDot");
      fireEvent.click(dropDown[0]);
      const editButton = screen.getByText("Edit");
      fireEvent.click(editButton);
      console.log("Edit Button Should Work", details);
      expect(setDataEditTo).toHaveBeenCalledWith(details[1]);
      done();
    }, 501);
  });

  test("Delete and Edit button should render", () => {
    render(
      <DataTable
        details={details}
        setDataEditTo={setDataEditTo}
        removeDetail={removeDetail}
      />
    );
    setTimeout(() => {
      const dropDown = screen.getAllByTestId("threeDot");
      fireEvent.click(dropDown[0]);
      const editButton = screen.getByText("Edit");
      const deleteButton = screen.getByTestId("Delete-1");
      expect(deleteButton).toBeInTheDocument();
      expect(editButton).toBeInTheDocument();
    }, 502);
  });

  test("Should show number of record in table", () => {
    render(<DataTable details={details} />);
    const recordCount = screen.getByText("Total Record in Table 2 out of 25");
    expect(recordCount).toBeInTheDocument();
  });

  // test("Should Show Popup when click on delete", (done) => {
  //   render(<DataTable details={details} removeDetail={removeDetail} />);
  //   const alertMock = jest.spyOn(window, "confirm").mockImplementation();
  //   setTimeout(async () => {
  //     const dropDown = await screen.findAllByTestId("threeDot");
  //     fireEvent.click(dropDown[0]);

  //     const deleteButton = await screen.findByTestId("Delete-1");
  //     fireEvent.click(deleteButton);
  //     expect(alertMock).toHaveBeenCalledTimes(1);
  //     done();
  //   }, 2500);
  // });
  test("Should Show Popup when click on delete", async () => {
    render(<DataTable details={details} removeDetail={removeDetail} />);
    window.confirm = jest.fn().mockReturnValue(true);
    setTimeout(async () => {
      const dropDown = await screen.findAllByTestId("threeDot");
      fireEvent.click(dropDown[0]);

      const deleteButton = await screen.findByTestId("Delete-1");
      fireEvent.click(deleteButton);
      expect(window.confirm).toHaveBeenCalled();
    }, 4500);
  });

  test("Remove Detial should called after confirming delete", () => {
    render(<DataTable details={details} removeDetail={removeDetail} />);
    window.confirm = jest.fn().mockReturnValue(true);
    setTimeout(async () => {
      const dropDown = await screen.findAllByTestId("threeDot");
      fireEvent.click(dropDown[0]);

      const deleteButton = await screen.findByTestId("Delete-1");
      fireEvent.click(deleteButton);
      expect(window.confirm).toHaveBeenCalled();
      expect(removeDetail).toHaveBeenCalledWith(2);
    }, 2000);
  });
});
