import { FC, useRef, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../store/features/notificationSlice";

import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import UserModel from "../models/UserModel";
import { findUserBySearchQuery } from "../services/userService";
import handleError from "../services/errorHandler";
import { useAppDispatch } from "../store/store";

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = "Szukaj" }) => {
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsDivRef = useRef<HTMLDivElement | null>(null);
  const [searchResults, setSearchResults] = useState<UserModel[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const fetchSearchResults = async (searchQuery: string) => {
    if (searchQuery.length > 0) {
      if (abortController) {
        abortController.abort();
      }
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      try {
        const data = await findUserBySearchQuery(
          searchQuery,
          1,
          20,
          newAbortController
        );
        if (data.status !== "ok") {
          throw new Error(data.message);
        }
        if (data.users.length === 0) {
          setSearchResults([]);
        } else {
          setSearchResults(data.users);
        }
      } catch (error) {
        const newError = handleError(error);
        if (
          newError.message === "Nie znaleziono żadnego użytkownika" ||
          newError.message === "The user aborted a request."
        ) {
          setSearchResults([]);
        } else {
          dispatch(
            addNotification({
              type: NotificationStatus.ERROR,
              message: newError.message,
            })
          );
        }
      }
    } else {
      setSearchResults([]);
    }
  };

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    fetchSearchResults(value);
  };

  const focusHandler = () => {
    setIsFocused(true);
    const value = searchInputRef.current?.value;
    if (searchInputRef.current?.value.length !== 0 && value) {
      fetchSearchResults(value);
    }
  };

  const blurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    if (
      resultsDivRef.current &&
      !resultsDivRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsFocused(false);
    }
    if (searchInputRef.current?.value === "") {
      setSearchResults([]);
    }
  };

  const setFocusOnInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div
      className="search-bar bg-grayLight dark:bg-grayDark flex items-center  rounded-md text-md xl:text-xl min-w-12 relative cursor-text focus-within:ring-2 focus-within:ring-blue-600 "
      onClick={setFocusOnInput}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="bg-grayLight dark:bg-grayDark px-2 xl:px-4 py-2 focus:outline-none  rounded-md"
        ref={searchInputRef}
        onChange={changeHandler}
        onFocus={focusHandler}
        onBlur={blurHandler}
      />
      <span
        className={`block px-2 xl:px-4 text-gray-400 transition-all text-2xl ${
          isFocused ? "translate-x-[-20px]" : ""
        }`}
      >
        <FaSearch />
      </span>
      {isFocused && (
        <div
          className="absolute top-12 bg-grayLight dark:bg-grayDark py-4 px-2 rounded-md w-full z-50"
          ref={resultsDivRef}
        >
          <ul>
            {searchResults.map((user) => (
              <li key={user.id}>
                <NavLink
                  to={`/user/${user.nickname}`}
                  className=" py-2 px-4 hover:bg-blue-600 hover:text-blue-50 flex items-center gap-2 rounded-md"
                >
                  <img
                    src={user.imageUrl}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  {user.firstName} {user.lastName}
                </NavLink>
              </li>
            ))}
          </ul>
          {searchResults.length === 0 && searchInputRef.current?.value && (
            <p className="text-center text-sm">Brak wyników</p>
          )}
          {!searchInputRef.current?.value && (
            <p className="text-center text-sm">Wpisz coś</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
