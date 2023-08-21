import { useContext } from "react";
import TodoItem from "./TodoItem";
import TodosList from "./context/TodosList";
import FilterContext from "./context/FilterContext";

function AppContent() {
  const todos = useContext(TodosList);
  const { filter } = useContext(FilterContext);
  const sortedTodos = [...todos];
  sortedTodos.sort((a, b) => new Date(b.time) - new Date(a.time));
  const filtered = sortedTodos.filter((todo) =>
    filter === "all" ? true : todo.status === filter
  );

  return (
    <div className="item-container">
      {filtered && filtered.length > 0
        ? filtered.map((todo) => (
            <TodoItem todo={todo} key={todo.id}></TodoItem>
          ))
        : "no todo found"}
    </div>
  );
}

export default AppContent;
