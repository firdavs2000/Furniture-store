"use client";

import Select, { SingleValue } from "react-select";

interface IOption {
  value: string;
  label: string;
}

interface SortProps {
  setSort: (sort: string, order: "asc" | "desc") => void;
}

const Sort: React.FC<SortProps> = ({ setSort }) => {
  const options: IOption[] = [
    { value: "", label: "Default" },
    { value: "price-asc", label: "Price: Low → High" },
    { value: "price-desc", label: "Price: High → Low" },
    { value: "title-asc", label: "Title: A → Z" },
    { value: "title-desc", label: "Title: Z → A" },
     { value: "rating-asc", label: "Rating: A → Z" },
    { value: "rating-desc", label: "Rating: Z → A" },
  ];

  const handleChange = (opt: SingleValue<IOption>) => {
    if (!opt || opt.value === "") {
      setSort("", "asc");
      return;
    }

    const [sort, order] = opt.value.split("-");
    setSort(sort, order as "asc" | "desc");
  };



  return (
    <div className="w-full md:w-64">
      <Select
        options={options}
        onChange={handleChange}
        placeholder="Sort by"
        isClearable
      />
    </div>
  );
};

export default Sort;
