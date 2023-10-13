import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="search-bar bg-grayLight dark:bg-grayDark flex items-center  rounded-md text-xl">
      <input
        type="text"
        placeholder="Szukaj"
        className="bg-grayLight dark:bg-grayDark px-4 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
      />
      <button
        type="submit"
        className="text-gray-500  py-2 px-4 h-full focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md"
      >
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
