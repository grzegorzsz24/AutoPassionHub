import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { createArticle } from "../../services/articleService";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";
import { useState } from "react";

const AddArticlePage = () => {
  const reduxDispatch = useAppDispatch();
  const {
    showErrorNotification,
    showSuccessNotification,
    showInfoNotification,
  } = useNotification();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(e.target.value);
  };

  const validateForm = () => {
    if (title.length === 0 || content.length === 0) return false;
    return true;
  };

  const clearInputs = () => {
    setTitle("");
    setContent("");
  };

  const onFormSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return showInfoNotification("Wypełnij wszystkie pola");
    }
    try {
      reduxDispatch(startLoading());
      const data = await createArticle(title, content);
      if (data.status !== "ok") throw new Error(data.message);
      showSuccessNotification(data.message);
      clearInputs();
    } catch (error) {
      showErrorNotification(error);
    } finally {
      reduxDispatch(stopLoading());
    }
    return;
  };

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Otwórz nowe artykuł</h2>
      <form className="max-w-3xl" onSubmit={onFormSubmitHandler}>
        <TextareaAutosize
          value={title}
          onChange={onTitleChangeHandler}
          className="mb-2 w-full resize-none overflow-auto rounded-md border-none bg-white px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600 dark:bg-grayDark"
          placeholder="Tytuł"
          minRows={1}
          maxRows={3}
        />
        <TextareaAutosize
          value={content}
          onChange={onContentChangeHandler}
          className="mb-2 w-full resize-none overflow-auto rounded-md border-none bg-white px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600 dark:bg-grayDark"
          placeholder="Treść"
          minRows={10}
          maxRows={100}
        />
        <PrimaryButton
          fullWidth
          type="submit"
          disabled={!validateForm()}
          onClick={() => {}}
        >
          Utwórz
        </PrimaryButton>
      </form>
    </div>
  );
};

export default AddArticlePage;
