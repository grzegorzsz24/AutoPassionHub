import { FC, useRef, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";

import ArticleMenu from "../../components/Menu/ArticleMenu";
import ArticleModel from "../../models/ArticleModel";
import ArticleResults from "./ArticleResults";
import { FaSearch } from "react-icons/fa";
import ForumModel from "../../models/ForumModel";
import ForumResults from "./ForumResults";
import { NavLink } from "react-router-dom";
import PostModel from "../../models/PostModel";
import PostsResults from "./PostsResults";
import UserModel from "../../models/UserModel";
import UserResults from "./UserResults";
import { findUserBySearchQuery } from "../../services/userService";
import { getSearchResults } from "../../services/searchService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

interface SearchResults {
  users: UserModel[];
  posts: PostModel[];
  articles: ArticleModel[];
  forums: ForumModel[];
}

interface SearchBarProps {
  placeholder?: string;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = "Szukaj" }) => {
  const dispatch = useAppDispatch();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const resultsDivRef = useRef<HTMLDivElement | null>(null);
  // const [searchResults, setSearchResults] = useState<UserModel[]>([]);
  const [searchResults, setSearchResults] = useState<SearchResults>({
    users: [],
    posts: [],
    articles: [],
    forums: [],
  });
  const [isFocused, setIsFocused] = useState(false);
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);

  const updateSearchResults = (
    users: UserModel[],
    forums: ForumModel[],
    articles: ArticleModel[],
    posts: PostModel[]
  ) => {
    setSearchResults((prev) => ({
      ...prev,
      users,
      forums,
      articles,
      posts,
    }));
  };

  const clearSearchResults = () => {
    updateSearchResults([], [], [], []);
  };

  const searchResulsAreEmpty = () => {
    return (
      searchResults.users.length === 0 &&
      searchResults.forums.length === 0 &&
      searchResults.articles.length === 0 &&
      searchResults.posts.length === 0
    );
  };

  const fetchSearchResults = async (searchQuery: string) => {
    if (searchQuery.length > 0) {
      if (abortController) {
        abortController.abort();
      }
      const newAbortController = new AbortController();
      setAbortController(newAbortController);
      try {
        // const data = await findUserBySearchQuery(
        //   searchQuery,
        //   1,
        //   20,
        //   newAbortController
        // );
        const data = await getSearchResults(searchQuery, newAbortController);
        console.log(data);
        if (data.status !== "ok") {
          throw new Error(data.message);
        }

        updateSearchResults(data.users, data.forums, data.articles, data.posts);
        // if (data.users.length === 0) {
        //   setSearchResults([]);
        // } else {
        //   setSearchResults(data.users);
        // }
      } catch (error) {
        const newError = handleError(error);
        if (
          newError.message === "Brak wyników wyszukiwań" ||
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
      clearSearchResults();
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
      clearSearchResults();
    }
  };

  const setFocusOnInput = () => {
    searchInputRef.current?.focus();
  };

  return (
    <div
      className=" bg-grayLight dark:bg-grayDark flex items-center grow max-w-md rounded-md text-sm xl:text-md 2xl:text-lg min-w-12 relative cursor-text focus-within:ring-2 focus-within:ring-blue-600 "
      onClick={setFocusOnInput}
    >
      <input
        type="text"
        placeholder={placeholder}
        className="bg-grayLight dark:bg-grayDark px-2 xl:px-4 py-2 focus:outline-none  rounded-md w-full"
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
          className="absolute top-12 bg-grayLight dark:bg-grayDark py-4 px-2 rounded-md w-full z-50 max-h-96 overflow-y-auto"
          ref={resultsDivRef}
        >
          <UserResults users={searchResults.users} />
          <PostsResults posts={searchResults.posts} />
          <ForumResults forums={searchResults.forums} />
          <ArticleResults articles={searchResults.articles} />
          {searchResulsAreEmpty() && searchInputRef.current?.value && (
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