import React from "react";
import ReactPaginate from "react-paginate";

interface PaginateProps {
  totalPages: number;
  currentPage: number;
  setParamPage: (value: number) => void;
}

const Paginate: React.FC<PaginateProps> = ({
  totalPages,
  currentPage,
  setParamPage,
}) => {
  const onPageChange = (event: { selected: number }) => {
    const selectedPage = event.selected + 1; // 0-based -> 1-based
    setParamPage(selectedPage);
  };

  return (
    <div className="my-8 flex justify-center">
      <ReactPaginate
        pageCount={totalPages}
        forcePage={currentPage - 1} // <-- sync with currentPage dynamically
        onPageChange={onPageChange}
        previousLabel="<<"
        nextLabel=">>"
        breakLabel="..."
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        containerClassName="flex items-center gap-2"
        pageClassName="px-3 py-1 rounded-lg border border-gray-300 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 hover:text-white"
        previousClassName="px-3 py-1 rounded-lg border border-gray-300 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 hover:text-white"
        nextClassName="px-3 py-1 rounded-lg border border-gray-300 cursor-pointer transition-all duration-200 hover:bg-gradient-to-r hover:from-gray-400 hover:to-gray-600 hover:text-white"
        breakClassName="px-3 py-1 cursor-default"
        activeClassName="bg-gradient-to-r from-gray-500 to-gray-700 text-white border-gray-700 font-semibold shadow-lg transform scale-105"
        disableInitialCallback
      />
    </div>
  );
};

export default Paginate;
