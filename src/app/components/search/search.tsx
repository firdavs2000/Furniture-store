// app/components/Qidiruv.tsx yoki components/Qidiruv.tsx
"use client"; // Next.js 13 App Router-da client component ekanligini aytish uchun

import React from "react";


interface Props {
  search: string;
  setSearch: (value: string) => void;
}

const Qidiruv: React.FC<Props> = ({ search, setSearch }) => {
  return (
   <div className="qidiruv_wrapper flex items-center border rounded p-2">
  <input
    type="text"
    className="qidiruv flex-1 outline-none"
    placeholder="Search..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
  <img src="/qidiruv.svg" alt="Qidiruv" className="qidiruv_icon ml-2" />
</div>

  );
};

export default Qidiruv;
