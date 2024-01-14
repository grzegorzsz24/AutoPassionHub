import { Dispatch, FC, useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";

interface FilterAction {
  type: string;
  payload?: string | number;
}

interface ForumFiltersProps {
  title: string;
  dispatch: Dispatch<FilterAction>;
}

const ArticleFilters: FC<ForumFiltersProps> = ({ title, dispatch }) => {
  const [typedTitle, setTypedTitle] = useState(title);

  const clearFilters = () => {
    dispatch({ type: "CLEAR_FILTERS" });
    setTypedTitle("");
  };

  const setTitle = (title: string) => {
    dispatch({ type: "SET_TITLE", payload: title });
  };

  const onSubmitTitleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTitle(typedTitle);
  };

  return (
    <div className="flex flex-col items-center gap-2  sm:flex-row sm:gap-4">
      <form onSubmit={onSubmitTitleForm}>
        <input
          value={typedTitle}
          onChange={(e) => {
            setTypedTitle(e.target.value);
          }}
          type="text"
          placeholder="Szukaj po nazwie"
          className="w-72 rounded-md bg-white p-2 outline-none ring-blue-600 focus:ring-2 dark:bg-grayDark"
        />
      </form>
      <PrimaryButton size="md" onClick={clearFilters}>
        Wyczyść filtry
      </PrimaryButton>
    </div>
  );
};

export default ArticleFilters;
