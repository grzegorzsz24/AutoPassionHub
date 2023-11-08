import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { createArticle } from "../../services/articleService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useState } from "react";

const AddArticlePage = () => {
  const reduxDispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
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
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: "Uzupełnij tytuł i treść",
        })
      );
      return;
    }
    try {
      reduxDispatch(startLoading());
      const data = await createArticle(title, content);
      if (data.status !== "ok") throw new Error(data.message);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: data.message,
        })
      );
      clearInputs();
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      reduxDispatch(stopLoading());
    }
    return;
  };

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Otwórz nowe artykuł</h2>
      <form className="max-w-3xl" onSubmit={onFormSubmitHandler}>
        <TextareaAutosize
          value={title}
          onChange={onTitleChangeHandler}
          className="bg-white dark:bg-grayDark resize-none w-full outline-none border-none rounded-md overflow-auto py-2 px-2 mb-2 focus:ring-2 focus:ring-blue-600"
          placeholder="Tytuł"
          minRows={1}
          maxRows={3}
        />
        <TextareaAutosize
          value={content}
          onChange={onContentChangeHandler}
          className="bg-white dark:bg-grayDark resize-none w-full outline-none border-none rounded-md overflow-auto py-2 px-2 mb-2 focus:ring-2 focus:ring-blue-600"
          placeholder="Treść"
          minRows={10}
          maxRows={20}
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
