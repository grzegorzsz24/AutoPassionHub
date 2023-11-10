import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";

import { FC } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const pageButtons = [];
  console.log(currentPage, totalPages);

  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`px-4 py-2 rounded-md text-center bg-transparent text-primaryDark2 dark:text-blue-50 hover:bg-blue-600 hover:text-blue-50  transition-all cursor-pointe outline-none 
        ${currentPage === i ? "border-2 border-blue-600 cursor-default" : ""}
        `}
        onClick={() => goToPage(i)}
        disabled={currentPage === i}
      >
        {i}
      </button>
    );
  }
  if (totalPages <= 1) return <></>;

  return (
    <div className="flex items-center gap-4">
      <button
        className={`bg-blue-600 text-white  p-2 rounded-md text-center hover:bg-blue-900 transition-all cursor-pointer ${
          currentPage === 1 ? "invisible" : ""
        }`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdArrowBackIosNew />
      </button>

      {pageButtons}

      <button
        className={`bg-blue-600 text-white p-2 rounded-md text-center hover:bg-blue-900 transition-all cursor-pointer  ${
          currentPage === totalPages ? "invisible" : ""
        }`}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <MdArrowForwardIos />
      </button>
    </div>
  );
};

export default Pagination;
