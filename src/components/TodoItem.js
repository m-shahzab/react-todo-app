import { useEffect, useState } from "react";
import "./TodoItem.css";
import useTodoDispatch from "./hooks/TodoDispatch";
import TodoPopUp from "./TodoPopUp";
import { toast } from "react-toastify";
function TodoItem({ todo }) {
  console.log("todoItem component");
  const dispatch = useTodoDispatch();
  const [showModel, setshowModel] = useState(false);
  const [checked, setChecked] = useState(false);
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
  const deleteH = (e) => {
    e.preventDefault();
    dispatch({ type: "DELETE", payload: todo.id });
    toast.success("Delete successfully 🙂", toastObj);
  };
  const checkTodo = () => {
    dispatch({
      type: "STATUS",
      payload: { id: todo.id, status: checked ? "incomplete" : "complete" },
    });
  };
  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  return (
    <>
      <div className="todoItem">
        <div className="items">
          <div className="checked_false">
            <input type="checkbox" onChange={checkTodo} checked={checked} />
          </div>
          <div className="item_details">
            <p
              style={{
                textDecoration: checked ? "line-through" : "",
                color: checked ? "darkgray" : "black",
              }}
            >
              {todo.title}
            </p>
          </div>
        </div>
        <div className="itemAcion">
          <div
            className="todoItem_icon__+DYyU"
            tabIndex="0"
            role="button"
            onClick={deleteH}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path>
            </svg>
          </div>
          <div
            className="todoItem_icon__+DYyU"
            tabIndex="0"
            role="button"
            onClick={() => setshowModel(true)}
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
            </svg>
          </div>
        </div>
      </div>
      <TodoPopUp
        showModel={showModel}
        setshowModel={setshowModel}
        type="update"
        todo={todo}
      ></TodoPopUp>
    </>
  );
}

export default TodoItem;
