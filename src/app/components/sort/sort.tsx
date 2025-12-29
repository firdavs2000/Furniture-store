"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import type { SingleValue } from "react-select";



const Select = dynamic(() => import("react-select"), {
  ssr: false,
});



const options = [
  { value: "", label: "Default" },
  { value: "price-asc", label: "Price ↑ (asc)" },
  { value: "price-desc", label: "Price ↓ (desc)" },
  { value: "title-asc", label: "asc" },
  { value: "title-desc", label: "desc" },
] as const;


export type SortValue = (typeof options)[number]["value"];

export interface SortOption {
  value: SortValue;
  label: string;
}

interface SortProps {
  setSort: (value: SortValue) => void;
}



const Sort: React.FC<SortProps> = ({ setSort }) => {
  const [value, setValue] =
    useState<SingleValue<SortOption>>(null);

  const handleChange = (
    option: SingleValue<SortOption>
  ) => {
    setValue(option);
    setSort(option?.value ?? "");
  };

  return (
    <div className="w-60">
      <Select<SortOption, false>
        options={options as readonly SortOption[]}
        value={value}
        onChange={handleChange}
        placeholder="Sort by..."
        isClearable
        classNamePrefix="react-select"
      />
    </div>
  );
};

export default Sort;
