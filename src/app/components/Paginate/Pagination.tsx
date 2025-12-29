"use client";

import React from "react";
import ReactPaginate from "react-paginate";

interface PaginateProps {
  totalItems: number;
  currentPage: number;
  setParamPage: (value: number) => void;
  itemsPerPage?: number;
}

const Paginate: React.FC<PaginateProps> = ({
  totalItems,
  currentPage,
  setParamPage,
  itemsPerPage = 12,
}) => {
  const pageCount = Math.ceil((totalItems || 0) / itemsPerPage);

  const onPageChange = (event: { selected: number }) => {
    const selectedPage = event.selected + 1;
    setParamPage(selectedPage);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      initialPage={currentPage - 1}
      onPageChange={onPageChange}
      previousLabel="«"
      nextLabel="»"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={3}
      containerClassName="flex justify-center items-center space-x-2 mt-6"
      pageLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray transition"
      previousLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
      nextLinkClassName="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-200 transition"
      breakLinkClassName="px-3 py-1 text-gray-500"
      activeClassName="bg-gray-300 text-white border-gray"
    />
  );
};

export default Paginate;
