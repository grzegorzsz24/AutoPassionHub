import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useReducer, useState } from "react";

import ForumFilters from "../../components/Forums/ForumFilters";
import ForumModel from "../../models/ForumModel";
import ForumsLits from "../../components/Forums/ForumsLits";
import Pagination from "../../components/Pagination";
import forumFilterReducer from "../../reducers/ForumFilterReducer";
import { getForums } from "../../services/forumService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useSearchParams } from "react-router-dom";

const ForumsPage = () => {
  const reduxDispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [forums, setForums] = useState<ForumModel[]>([]);
  const [isFetchingCars, setIsFetchingCars] = useState(true);
  const [totalNumberOfForums, setTotalNumberOfForums] = useState(0);

  const setFiltersFromParams = () => {
    return {
      page: getPageFromParams(),
      size: 1,
      title: params.get("title") || "",
      carBrand: params.get("carBrand") || "",
      carModel: params.get("carModel") || "",
    };
  };
  const getPageFromParams = () => {
    let page = Number(params.get("page")) || 1;
    if (page < 1) page = 1;
    return page;
  };

  const [filterState, filterDispatch] = useReducer(
    forumFilterReducer,
    setFiltersFromParams()
  );
  const { page, size, title, carBrand, carModel } = filterState;

  const buildQueryParams = () => {
    let queryParams = "";
    if (Number(page) > 1) queryParams += `page=${page}`;
    if (title.length > 0) queryParams += `&title=${title}`;
    if (carBrand.length > 0) queryParams += `&carBrand=${carBrand}`;
    if (carModel.length > 0) queryParams += `&carModel=${carModel}`;
    return queryParams;
  };

  const fetchForums = async () => {
    try {
      setParams(buildQueryParams());
      const data = await getForums(page, size, title, carBrand, carModel);

      if (data.status !== "ok") throw new Error(data.message);

      setForums(data.data);
      setTotalNumberOfForums(data.totalNumberOfForums);
      console.log(data.totalNumberOfForums);
    } catch (error) {
      const newError = handleError(error);
      reduxDispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  useEffect(() => {
    fetchForums();
  }, [filterState]);

  return (
    <div className="max-w-4xl h-full flex flex-col justify-between">
      <div className="flex flex-col  gap-12">
        <ForumFilters
          title={title}
          carBrand={carBrand}
          carModel={carModel}
          dispatch={filterDispatch}
          isLoading={isFetchingCars}
          setIsLoading={setIsFetchingCars}
        />
        {!isFetchingCars && forums.length === 0 && (
          <p className="text-center text-lg">Nie znaleiono forów</p>
        )}
        {forums.length > 0 && <ForumsLits forums={forums} />}
      </div>
      {forums.length > 0 && !isFetchingCars && (
        <div className=" flex items-center justify-center my-4">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalNumberOfForums / size)}
            goToPage={(page: number) =>
              filterDispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      )}
    </div>
  );
};

export default ForumsPage;
