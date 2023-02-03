import RegisterForm from "./component/form";
import DataTable from "./component/table";
import { useState } from "react";
import { userData } from "./userData";
import "./app.css";

function App() {
  const countOfDataToFetch = 6;
  const [details, setDetails] = useState(userData.slice(0, countOfDataToFetch));
  const [editData, setEditData] = useState(null);
  const [recordFetchedFromDb, setRecordFetchedFromDb] =
    useState(countOfDataToFetch);
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
    setEditData(null);
  };

  const addDataOnDemand = () => {
    setDetails([
      ...details,
      ...userData.slice(
        recordFetchedFromDb,
        recordFetchedFromDb + countOfDataToFetch
      ),
    ]);
    setRecordFetchedFromDb((prev) => prev + countOfDataToFetch);
  };

  const removeDetail = (id) => {
    setDetails((prev) => prev.filter((detail) => detail.id !== id));
  };
  const removeMutipleDetail = (items) => {
    setDetails((prev) =>
      prev.filter((detail) => {
        return !items.some((obj) => obj.id === detail.id);
      })
    );

    console.log("details<<<<", details);
  };
  if (details.length < countOfDataToFetch - 1 && recordFetchedFromDb < 30) {
    addDataOnDemand();
  }

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
          removeMutipleDetail={removeMutipleDetail}
        />
      </div>
    </div>
  );
}

export default App;
