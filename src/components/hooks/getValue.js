import { useState } from "react";

function useSelectValue() {
  const [value, setValue] = useState("all");

  const handleSelect = (selectedValue) => {
    setValue(selectedValue);
  };

  return [value, handleSelect];
}

export default useSelectValue;
