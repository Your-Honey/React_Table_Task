import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import "./table.css";
// eslint-disable-next-line react/display-name
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    <span className="threedots" />
  </a>
));
function DataTable({ details, setIdEditTo }) {
  const [data, setData] = useState(details);
  useEffect(() => {
    console.log("details from table<<<", details);
    setData(details);
  }, [details]);

  return (
    <Container>
      {data.length === 0 ? (
        <div>No Data</div>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Password</th>
              <th>About</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((detail, index) => {
              return (
                <tr key={detail.id}>
                  <td>{index + 1}</td>
                  <td>{detail.email}</td>
                  <td>{detail.password}</td>
                  <td>{detail.about}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item onClick={() => setIdEditTo(detail.id)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item>Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default DataTable;
