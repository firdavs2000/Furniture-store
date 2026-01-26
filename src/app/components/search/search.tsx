"use client";

import React from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const Qidiruv: React.FC<Props> = ({ search, setSearch }) => {
  return (
    <div className="qidiruv_wrapper flex items-center border-2px rounded p-2 sm:p-3">
      <input
        type="text"
        className="qidiruv flex-1 outline-none text-sm sm:text-base px-2 py-1 sm:px-4 sm:py-2"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <img
        src="/qidiruv.svg"
        alt="Qidiruv"
        className="qidiruv_icon ml-2 w-5 h-5 sm:w-6 sm:h-6"
      />
    </div>
  );
};

export default Qidiruv;
