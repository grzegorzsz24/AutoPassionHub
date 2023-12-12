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

  for (let i = 1; i <= totalPages; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`cursor-pointe rounded-md bg-transparent px-4 py-2 text-center text-primaryDark2 outline-none transition-all  hover:bg-blue-600 hover:text-blue-50 dark:text-blue-50 
        ${currentPage === i ? "cursor-default border-2 border-blue-600" : ""}
        `}
        onClick={() => goToPage(i)}
        disabled={currentPage === i}
      >
        {i}
      </button>,
    );
  }
  if (totalPages <= 1) return <></>;

  return (
    <div className="flex items-center gap-4">
      <button
        className={`cursor-pointer rounded-md  bg-blue-600 p-2 text-center text-white transition-all hover:bg-blue-900 ${
          currentPage === 1 ? "invisible" : ""
        }`}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdArrowBackIosNew />
      </button>

      {pageButtons}

      <button
        className={`cursor-pointer rounded-md bg-blue-600 p-2 text-center text-white transition-all hover:bg-blue-900  ${
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
