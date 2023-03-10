import React, { useEffect, useState, useRef } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import "./table.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "react-bootstrap/Button";
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
    <span data-testid="threeDot" className="threedots" />
  </a>
));
function DataTable({
  details,
  removeMutipleDetail,
  setDataEditTo,
  addDataOnDemand,
  removeDetail,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(details);
  const [sortOrder, setSortOrder] = useState("desc");
  const listInnerRef = useRef();
  const [loading, setLoading] = useState(false);
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);
  console.log("table");

  useEffect(() => {
    const filtered = details.filter((item) => {
      return (
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.password.toString().includes(searchTerm) ||
        item.about.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    filtered.sort((a, b) => {
      return new Date(b["createdAt"]) - new Date(a["createdAt"]);
    });
    setLoading(true);
    setTimeout(() => {
      setFilteredData(filtered);
      setLoading(false);
    }, 500);
  }, [details, searchTerm]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      removeDetail(id);
    }
  };
  const multipleDeleteHandler = () => {
    if (window.confirm("Are you sure to delete Seleted Item?")) {
      setSelectAllCheckBox(false);
      const list = filteredData.filter((obj) => obj.checkBoxValue);
      removeMutipleDetail(list);
    }
  };

  const handleSort = (fieldName) => {
    const sortedData = filteredData.sort((a, b) => {
      if (sortOrder === "asc") {
        if (fieldName === "createdAt") {
          return new Date(b["createdAt"]) - new Date(a["createdAt"]);
        }
        return a[fieldName].toLowerCase() < b[fieldName].toLowerCase() ? 1 : -1;
      } else {
        if (fieldName === "createdAt") {
          return new Date(a["createdAt"]) - new Date(b["createdAt"]);
        }
        return a[fieldName].toLowerCase() < b[fieldName].toLowerCase() ? -1 : 1;
      }
    });
    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
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
  const selectAllCheckBoxHandler = () => {
    if (selectAllCheckBox) {
      setSelectAllCheckBox(false);
      setFilteredData((prev) =>
        prev.map((item) => {
          item.checkBoxValue = false;
          return item;
        })
      );
    } else {
      setSelectAllCheckBox(true);
      setFilteredData((prev) =>
        prev.map((item) => {
          item.checkBoxValue = true;
          return item;
        })
      );
    }
  };
  const singleCheckBoxHandler = (id) => {
    setFilteredData(
      filteredData.map((item) => {
        if (item.id === id) {
          item.checkBoxValue = !item.checkBoxValue;
          return item;
        } else {
          return item;
        }
      })
    );
  };
  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight && !loading) {
        // TO SOMETHING HERE
        if (!scrollTop === 2075) {
          listInnerRef.current.scrollTop = 300;
        }

        addDataOnDemand();
        console.log("Reached bottom");
      }
    }
  };

  return (
    <Container>
      <div className="input-group">
        <div className="form-outline">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="search-input"
            autoComplete="off"
            placeholder="Search..."
            type="search"
            className="form-control searchbar"
          />
        </div>
        {loading && (
          <img
            className="loadingimg"
            src="loading-buffering.gif"
            alt="loading..."
          />
        )}
      </div>

      {details.length === 0 ? (
        <div>No Data</div>
      ) : (
        <>
          <div>Total Record in Table {filteredData.length} out of 25</div>
          <div
            style={{ height: "400px", overflowY: "scroll" }}
            onScroll={() => onScroll()}
            ref={listInnerRef}
          >
            <Table className="table" striped bordered hover>
              <thead>
                <tr>
                  <th>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectAllCheckBox}
                        onChange={() => selectAllCheckBoxHandler()}
                        id="defaultCheck1"
                      />
                      <label className="form-check-label">Id</label>
                    </div>
                  </th>
                  <th>
                    Email{" "}
                    <span
                      data-testid="email-sort"
                      className="material-symbols-outlined icon"
                      onClick={() => handleSort("email")}
                    >
                      sort
                    </span>
                  </th>
                  <th>Password</th>
                  <th>About</th>
                  <th>
                    Created At{" "}
                    <span
                      data-testid="date-sort"
                      className="material-symbols-outlined icon"
                      onClick={() => handleSort("createdAt")}
                    >
                      sort
                    </span>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              {filteredData.length === 0 && "NO DATA FOUND"}
              {loading ? (
                <tbody>
                  <tr>
                    <td>
                      <Skeleton height={40} count={10} />
                    </td>
                    <td>
                      <Skeleton height={40} count={10} />
                    </td>
                    <td>
                      <Skeleton height={40} count={10} />
                    </td>
                    <td>
                      <Skeleton height={40} count={10} />
                    </td>
                    <td>
                      <Skeleton height={40} count={10} />
                    </td>
                    <td>
                      <Skeleton height={40} count={10} />
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {filteredData.map((detail, index) => {
                    return (
                      <tr key={detail.id}>
                        <td>
                          {" "}
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={detail.checkBoxValue}
                              onChange={() => singleCheckBoxHandler(detail.id)}
                            />
                            <label className="form-check-label">
                              {index + 1}
                            </label>
                          </div>
                        </td>
                        <td data-testid={`email-${index + 1}`}>
                          {detail.email}
                        </td>
                        <td data-testid={`password-${index + 1}`}>
                          {detail.showPassword
                            ? detail.password
                            : "****************"}
                          <span
                            className="link"
                            onClick={() => handlePassword(detail.id)}
                          >
                            {detail.showPassword ? (
                              <span className="material-symbols-outlined">
                                lock_open
                              </span>
                            ) : (
                              <span className="material-symbols-outlined">
                                lock
                              </span>
                            )}
                          </span>
                        </td>
                        <td data-testid={`about-${index + 1}`}>
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
                              {detail.about.substring(0, 21)}....
                              <span
                                className="link"
                                onClick={() => handleAbout(detail.id)}
                              >
                                {" "}
                                more
                              </span>
                            </span>
                          )}
                        </td>
                        <td>{timeSince(detail.createdAt)}</td>
                        <td>
                          <Dropdown>
                            <Dropdown.Toggle as={CustomToggle} />
                            <Dropdown.Menu size="sm" title="">
                              <Dropdown.Item
                                data-testid={`Edit-${index + 1}`}
                                onClick={() => setDataEditTo(detail)}
                              >
                                Edit
                                <span className="material-symbols-outlined">
                                  edit
                                </span>
                              </Dropdown.Item>
                              <Dropdown.Item
                                data-testid={`Delete-${index + 1}`}
                                onClick={() => deleteHandler(detail.id)}
                              >
                                Delete{" "}
                                <span className="material-symbols-outlined">
                                  auto_delete
                                </span>
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              )}
            </Table>
          </div>
        </>
      )}
      {(selectAllCheckBox ||
        filteredData.some((obj) => obj.checkBoxValue === true)) && (
        <Button
          className="deletebutton"
          variant="primary"
          onClick={multipleDeleteHandler}
        >
          Delete Selected
          <span class="material-symbols-outlined deleteicon">delete</span>
        </Button>
      )}
    </Container>
  );
}

function timeSince(date) {
  const now = new Date();
  const secondsPast =
    (new Date(now).getTime() - new Date(date).getTime()) / 1000;

  if (secondsPast < 60) {
    return " Just Now";
  }
  if (secondsPast < 3600) {
    return parseInt(secondsPast / 60) + " minutes ago";
  }
  if (secondsPast <= 86400) {
    return parseInt(secondsPast / 3600) + " hours ago";
  }
  if (secondsPast <= 2592000) {
    return parseInt(secondsPast / 86400) + " days ago";
  }
  if (secondsPast <= 31104000) {
    return parseInt(secondsPast / 2592000) + " months ago";
  }
  return parseInt(secondsPast / 31104000) + " years ago";
}

export default DataTable;
