import RegisterForm from "./component/form";
import DataTable from "./component/table";
import { useState } from "react";
import { userData } from "./userData";

function App() {
  const [details, setDetails] = useState(userData);
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

  const removeDetail = (id) => {
    setDetails(details.filter((detail) => detail.id !== id));
  };
  return (
    <div>
      <RegisterForm
        addDetail={addDetail}
        details={details}
        editData={editData}
        editDetail={editDetail}
      />
      <DataTable
        details={details}
        setDataEditTo={setDataEditTo}
        removeDetail={removeDetail}
      />
    </div>
  );
}

export default App;
