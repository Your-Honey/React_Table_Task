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
function DataTable({ details, setDataEditTo, removeDetail }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(details);

  useEffect(() => {
    const filtered = details.filter((item) => {
      return (
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.password.toString().includes(searchTerm) ||
        item.about.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredData(filtered);
  }, [details, searchTerm]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      removeDetail(id);
    }
  };

  const handlePassword = (id) => {
    setFilteredData(
      filteredData.map((item) => {
        if (item.id === id) {
          item.showPassword = !item.showPassword;
          return item;
        } else {
          return item;
        }
      })
    );
  };

  const handleAbout = (id) => {
    setFilteredData(
      filteredData.map((item) => {
        if (item.id === id) {
          item.showText = !item.showText;
          return item;
        } else {
          return item;
        }
      })
    );
  };

  return (
    <Container>
      <div className="input-group">
        <div className="form-outline">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-input"
            placeholder="Search..."
            type="search"
            className="form-control searchbar"
          />
        </div>
      </div>

      {filteredData.length === 0 ? (
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
            {filteredData.map((detail, index) => {
              return (
                <tr key={detail.id}>
                  <td>{index + 1}</td>
                  <td>{detail.email}</td>
                  <td>
                    {detail.showPassword ? detail.password : "****************"}
                    <span
                      className="link"
                      onClick={() => handlePassword(detail.id)}
                    >
                      {detail.showPassword ? "hide" : "show"}
                    </span>
                  </td>
                  <td>
                    {detail.about.length <= 20 ? (
                      detail.about
                    ) : detail.showText ? (
                      <span>
                        {detail.about}
                        <span
                          className="link"
                          onClick={() => handleAbout(detail.id)}
                        >
                          {" "}
                          less
                        </span>
                      </span>
                    ) : (
                      <span>
                        {detail.about.substring(0, 21)}
                        <span
                          className="link"
                          onClick={() => handleAbout(detail.id)}
                        >
                          {" "}
                          more...
                        </span>
                      </span>
                    )}
                  </td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle} />
                      <Dropdown.Menu size="sm" title="">
                        <Dropdown.Item onClick={() => setDataEditTo(detail)}>
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => deleteHandler(detail.id)}>
                          Delete
                        </Dropdown.Item>
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
