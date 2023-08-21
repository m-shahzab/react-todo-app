import { useContext } from "react";
import FilterContext from "./context/FilterContext";

function SelectBtn({ children }) {
  const { filter, setFilter } = useContext(FilterContext);
  return (
    <select
      id="allTask"
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
    >
      {children}
    </select>
  );
}

export default SelectBtn;
