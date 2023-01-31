import RegisterForm from "./component/form";
import DataTable from "./component/table";
import { useState } from "react";

function App() {
  const [details, setDetails] = useState([]);
  const [editData, setEditData] = useState(null);

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
  return (
    <div>
      <RegisterForm
        addDetail={addDetail}
        details={details}
        editData={editData}
        editDetail={editDetail}
      />
      <DataTable details={details} setDataEditTo={setDataEditTo} />
    </div>
  );
}

export default App;
