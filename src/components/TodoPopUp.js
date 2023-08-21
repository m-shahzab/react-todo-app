import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoPopUp.css";
import useTodoDispatch from "./hooks/TodoDispatch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TodoPopUp({ showModel, setshowModel, type, todo }) {

  const dispatch = useTodoDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");

  const toastObj = {
    position: "bottom-right",
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };
  const cancelClick = () => {
    setTitle("");
    setshowModel(false);
  };
  const handlSubmit = (e) => {
    e.preventDefault();

    if (title && status) {
      if (type === "add") {
        const id = uuidv4();
        const newtodo = {
          title: title,
          status: status,
          id: id,
          time: new Date().toLocaleString(),
        };
        dispatch({ type: "ADDTODO", payload: newtodo });
        setTitle("");
        setshowModel(false);
        toast.success("Adding successfully 🙂", toastObj);
      }
      if (type === "update") {
        if (title === todo.title && status === todo.status) {
          toast.warn("Nothing to update 😶", toastObj);
          return;
        }
        const updated = {
          title: title,
          status: status,
          id: todo.id,
        };
        dispatch({ type: "UPDATE", payload: updated });
        setTitle("");
        setshowModel(false);
        toast.success("Updating successfully 🙂", toastObj);
      }
    } else {
      toast.error("Title is missing 😞", toastObj);
    }
  };
  useEffect(() => {
    if (showModel && type === "update") {
      setTitle(todo.title);
      setStatus(todo.status);
    }
  }, [showModel, todo, type]);

  return (
    <>
      {showModel && (
        <div className="todoModel">
          <div className="container">
            <div id="model_container">
              <div className="todomodel">
                <h3>{type === "update" ? "UPDATE Task" : "ADD Task"}</h3>
                <div className="todo__title">
                  <label htmlFor="todoTitle">Title</label>
                  <input
                    type="text"
                    id="todoTitle"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="todo__status" id="status">
                  <label htmlFor="todoStatus">Status</label>
                  <select
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="incomplete">incomplete</option>
                    <option value="complete">complete</option>
                  </select>
                </div>
                <div className="todo__action">
                  <button type="button" onClick={handlSubmit}>
                    {type === "update" ? "Update Task" : "ADD Task"}
                  </button>
                  <button type="button" onClick={cancelClick}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoPopUp;
