"use client";

import Select, { SingleValue } from "react-select";

interface IOption {
  value: string;
  label: string;
}

interface SortProps {
  setSort: (value: string) => void;
}

const Sort: React.FC<SortProps> = ({ setSort }) => {
  const options: IOption[] = [
    { value: "", label: "Default" },
    { value: "title", label: "Title" },
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
  ];

  const changeOption = (selectedOption: SingleValue<IOption>) => {
    setSort(selectedOption?.value || "");
  };

  return (
    <div className="sort_wrapper">
      <Select<IOption, false>
        instanceId="sort-select"
        inputId="sort-select-input"
        options={options}
        onChange={changeOption}
        className="sort_select"
        placeholder="Sort by..."
        isClearable
      />
    </div>
  );
};

export default Sort;
