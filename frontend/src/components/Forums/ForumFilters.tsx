import { Dispatch, FC, useEffect, useState } from "react";

import ForumFiltersSkeleton from "./ForumFiltersSkeleton";
import PrimaryButton from "../../ui/PrimaryButton";
import { getAllCarsWithModels } from "../../services/carService";
import { useNotification } from "../../hooks/useNotification";

interface FilterAction {
  type: string;
  payload?: string | number;
}

interface ForumFiltersProps {
  carBrand: string;
  carModel: string;
  title: string;
  dispatch: Dispatch<FilterAction>;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

type CarsData = {
  [brand: string]: string[];
};

const ForumFilters: FC<ForumFiltersProps> = ({
  carBrand,
  carModel,
  title,
  dispatch,
  isLoading,
  setIsLoading,
}) => {
  const { showErrorNotification } = useNotification();
  const [cars, setCars] = useState<CarsData>({});
  const [typedTitle, setTypedTitle] = useState(title);

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

  const setCarBrand = (brand: string) => {
    dispatch({ type: "SET_CAR_BRAND", payload: brand });
  };

  const setCarModel = (model: string) => {
    dispatch({ type: "SET_CAR_MODEL", payload: model });
  };

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
    console.log(title);
  };

  useEffect(() => {
    getCars();
  }, []);

  if (isLoading) return <ForumFiltersSkeleton />;

  return (
    <div className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-center">
      <form onSubmit={onSubmitTitleForm}>
        <input
          value={typedTitle}
          onChange={(e) => {
            setTypedTitle(e.target.value);
          }}
          type="text"
          placeholder="Szukaj po nazwie"
          className="w-full rounded-md bg-white p-2 outline-none ring-blue-600 focus:ring-2 dark:bg-grayDark lg:w-72"
        />
      </form>
      <form className="flex gap-4">
        <select
          className="w-full cursor-pointer rounded-md bg-white p-2 ring-blue-600 focus:ring-2 dark:bg-grayDark lg:w-36"
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
          className="w-full cursor-pointer rounded-md bg-white p-2 ring-blue-600 focus:ring-2 dark:bg-grayDark lg:w-36"
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
      </form>
      <PrimaryButton size="md" onClick={clearFilters}>
        Wyczyść filtry
      </PrimaryButton>
    </div>
  );
};

export default ForumFilters;
