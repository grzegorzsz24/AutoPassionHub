import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import LoadingSpinner from "../../ui/LoadingSpinner";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { createForum } from "../../services/forumService";
import { getAllCarsWithModels } from "../../services/carService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

type CarsData = {
  [brand: string]: string[];
};

const AddForumPage = () => {
  const reduxDispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [cars, setCars] = useState<CarsData>({});
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [carBrand, setCarBrand] = useState<string>("");
  const [carModel, setCarModel] = useState<string>("");

  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const onContentChangeHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setContent(e.target.value);
  };

  const getCars = async () => {
    try {
      setIsLoading(true);
      const data = await getAllCarsWithModels();
      if (data.status !== "ok") throw new Error(data.message);
      setCars(data.cars);
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    if (title.length === 0 || content.length === 0) return false;
    return true;
  };

  const clearInputs = () => {
    setTitle("");
    setContent("");
    setCarBrand("");
    setCarModel("");
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
      setIsLoading(true);
      const data = await createForum(title, content, carBrand, carModel);
      if (data.status !== "ok") throw new Error(data.message);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: "Utworzono forum",
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
      setIsLoading(false);
    }
    return;
  };

  useEffect(() => {
    getCars();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Otwórz nowe forum</h2>
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
        <div className="flex gap-6 mb-6">
          <select
            className="p-2 rounded-md cursor-pointer focus:ring-2 ring-blue-600 bg-white dark:bg-grayDark w-36"
            value={carBrand}
            onChange={(e) => setCarBrand(e.target.value)}
          >
            <option value={""}>Marka</option>
            {Object.keys(cars).map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            className="p-2 rounded-md cursor-pointer focus:ring-2 ring-blue-600 bg-white dark:bg-grayDark w-36"
            disabled={!carBrand}
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
          >
            <option value={""}>Model</option>
            {carBrand &&
              cars[carBrand].map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>
        <PrimaryButton
          fullWidth
          type="submit"
          disabled={!validateForm()}
          onClick={() => {}}
        >
          Otwórz
        </PrimaryButton>
      </form>
    </div>
  );
};

export default AddForumPage;
