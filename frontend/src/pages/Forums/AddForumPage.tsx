import { useEffect, useState } from "react";

import LoadingSpinner from "../../ui/LoadingSpinner";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { createForum } from "../../services/forumService";
import { getAllCarsWithModels } from "../../services/carService";
import { useNotification } from "../../hooks/useNotification";

type CarsData = {
  [brand: string]: string[];
};

const AddForumPage = () => {
  const { showErrorNotification, showSuccessNotification } = useNotification();
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
    e: React.ChangeEvent<HTMLTextAreaElement>,
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
      showErrorNotification(error);
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
      showErrorNotification("Wypełnij wszystkie pola");
      return;
    }
    try {
      setIsLoading(true);
      const data = await createForum(title, content, carBrand, carModel);
      if (data.status !== "ok") throw new Error(data.message);
      showSuccessNotification("Forum zostało utworzone");
      clearInputs();
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div>
      <h2 className="mb-4 text-lg font-bold">Otwórz nowe forum</h2>
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
          maxRows={20}
        />
        <div className="mb-6 flex gap-6">
          <select
            className="w-36 cursor-pointer rounded-md bg-white p-2 ring-blue-600 focus:ring-2 dark:bg-grayDark"
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
            className="w-36 cursor-pointer rounded-md bg-white p-2 ring-blue-600 focus:ring-2 dark:bg-grayDark"
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
