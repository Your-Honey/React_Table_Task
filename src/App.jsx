import RegisterForm from "./component/form";
import DataTable from "./component/table";
import { useState } from "react";
import { userData } from "./userData";
import "./app.css";

function App() {
  const countOfDataToFetch = 6;
  const [details, setDetails] = useState(userData.slice(0, countOfDataToFetch));
  const [editData, setEditData] = useState(null);
  console.log("app");
  const addDetail = (detail) => {
    setDetails(detail);
  };
  const setDataEditTo = (data) => {
    setEditData(data);
  };

  const editDetail = (data) => {
    setDetails(
      details.map((detail) => {
        if (detail.id === data.id) {
          return data;
        } else {
          return detail;
        }
      })
    );

    console.log("after update list<<<", details);
    setEditData(null);
  };

  const addDataOnDemand = () => {
    setDetails([
      ...details,
      ...userData.slice(details.length, details.length + countOfDataToFetch),
    ]);
  };

  const removeDetail = (id) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };
  return (
    <div className="parentdiv">
      <div>
        <RegisterForm
          addDetail={addDetail}
          details={details}
          editData={editData}
          editDetail={editDetail}
        />
      </div>
      <div>
        <DataTable
          details={details}
          setDataEditTo={setDataEditTo}
          removeDetail={removeDetail}
          addDataOnDemand={addDataOnDemand}
        />
      </div>
    </div>
  );
}

export default App;
