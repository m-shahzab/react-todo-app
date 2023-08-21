import AddBtn from "./AddBtn";
import SelectBtn from "./SelectBtn";
import "./AppHeader.css";

function AppHeader({ setshowModel }) {
  console.log("Header Components");

  return (
    <div className="app-header">
      <h1 style={{ textAlign: "center" }}>Todo App</h1>
      <div className="btnFlex">
        <AddBtn setshowModel={setshowModel}>Add Task</AddBtn>
        <SelectBtn>
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </SelectBtn>
      </div>
    </div>
  );
}

export default AppHeader;
