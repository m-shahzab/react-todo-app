import { useEffect, useReducer, useState } from "react";
import AppHeader from "./components/AppHeader";
import TodoPopUp from "./components/TodoPopUp";
import AppContent from "./components/AppContent";
import TodoDispatch from "./components/context/TodoDispatch";
import TodosList from "./components/context/TodosList";
import FilterContext from "./components/context/FilterContext";
import { ToastContainer } from "react-toastify";

function App() {
  console.log("App Components");
  const todosArry = JSON.parse(window.localStorage.getItem("todo")) || [];
  const todoRedFun = (todos, action) => {
    switch (action.type) {
      case "ADDTODO":
        return [...todos, action.payload];
      case "DELETE":
        return todos.filter((todo) => todo.id !== action.payload);
      case "UPDATE":
        const index = todos.findIndex((todo) => todo.id === action.payload.id);
        const copyTodos = [...todos];
        copyTodos.splice(index, 1, action.payload);
        return copyTodos;
      case "STATUS":
        return todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, status: action.payload.status };
          } else {
            return todo;
          }
        });
      default:
        return todos;
    }
  };
  const [todos, dispatch] = useReducer(todoRedFun, todosArry);

  const [showModel, setshowModel] = useState(false);
  const [filter, setFilter] = useState("all");
  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos]);
  return (
    <div className="container">
      <TodoDispatch.Provider value={dispatch}>
        <FilterContext.Provider value={{ filter, setFilter }}>
          <AppHeader setshowModel={setshowModel}></AppHeader>
          <TodosList.Provider value={todos}>
            <TodoPopUp
              showModel={showModel}
              setshowModel={setshowModel}
              type="add"
            ></TodoPopUp>
            <AppContent setshowModel={setshowModel}></AppContent>
          </TodosList.Provider>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            
          />
        </FilterContext.Provider>
      </TodoDispatch.Provider>
    </div>
  );
}

export default App;
