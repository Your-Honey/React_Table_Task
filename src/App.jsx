import RegisterForm from "./component/form";
import DataTable from "./component/table";
import { useState } from "react";

function App() {
  const [details, setDetails] = useState([]);
  const [editId, setEditID] = useState(null);

  const addDetail = (detail) => {
    console.log("DETAIL FROM APP<<<", detail);
    setDetails(detail);
    console.log("DETAILS FROM APP<<<", details);
  };
  const setIdEditTo = (id) => {
    setEditID(id);
  };
  return (
    <div>
      <RegisterForm addDetail={addDetail} details={details} editId={editId} />
      <DataTable details={details} setIdEditTo={setIdEditTo} />
    </div>
  );
}

export default App;
