import { useContext } from "react";
import TodoDispatch from "../context/TodoDispatch";


function useTodoDispatch() {
  return useContext(TodoDispatch);
}
export default useTodoDispatch;
