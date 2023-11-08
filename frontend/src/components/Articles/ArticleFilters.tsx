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
    <div className="flex gap-4 items-center">
      <form onSubmit={onSubmitTitleForm}>
        <input
          value={typedTitle}
          onChange={(e) => {
            setTypedTitle(e.target.value);
          }}
          type="text"
          placeholder="Szukaj po nazwie"
          className="p-2 rounded-md focus:ring-2 ring-blue-600 bg-white dark:bg-grayDark outline-none w-72"
        />
      </form>
      <PrimaryButton size="md" onClick={clearFilters}>
        Wyczyść filtry
      </PrimaryButton>
    </div>
  );
};

export default ArticleFilters;
