import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useReducer, useState } from "react";

import ForumFilters from "../../components/Forums/ForumFilters";
import ForumModel from "../../models/ForumModel";
import ForumSkeleton from "../../components/Forums/ForumSkeleton";
import ForumsLits from "../../components/Forums/ForumsLits";
import NoContent from "../../ui/NoContent";
import Pagination from "../../components/Pagination";
import forumFilterReducer from "../../reducers/ForumFilterReducer";
import { getForums } from "../../services/forumService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useSearchParams } from "react-router-dom";

const FORUMS_PER_PAGE = import.meta.env.VITE_FORUMS_PER_PAGE as number;

const ForumsPage = () => {
  const reduxDispatch = useAppDispatch();
  const [params, setParams] = useSearchParams();
  const [forums, setForums] = useState<ForumModel[]>([]);
  const [isFetchingCars, setIsFetchingCars] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [totalNumberOfForums, setTotalNumberOfForums] = useState(0);

  const setFiltersFromParams = () => {
    return {
      page: getPageFromParams(),
      size: FORUMS_PER_PAGE,
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
    queryParams += `page=${page}`;
    if (title.length > 0) queryParams += `&title=${title}`;
    if (carBrand.length > 0) queryParams += `&carBrand=${carBrand}`;
    if (carModel.length > 0) queryParams += `&carModel=${carModel}`;
    return queryParams;
  };

  const fetchForums = async () => {
    try {
      setIsLoading(true);
      setParams(buildQueryParams());
      const data = await getForums(page, size, title, carBrand, carModel);

      if (data.status !== "ok") throw new Error(data.message);

      setForums(data.data);
      setTotalNumberOfForums(data.totalNumberOfForums);
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

  useEffect(() => {
    fetchForums();
  }, [filterState]);

  return (
    <div className="max-w-4xl h-full flex flex-col justify-between ">
      <div className="flex flex-col gap-12">
        <ForumFilters
          title={title}
          carBrand={carBrand}
          carModel={carModel}
          dispatch={filterDispatch}
          isLoading={isFetchingCars}
          setIsLoading={setIsFetchingCars}
        />
        {!isFetchingCars && !isLoading && forums.length === 0 && (
          <NoContent>Brak forów</NoContent>
        )}
        {(isLoading || isFetchingCars) && (
          <div className="flex flex-col gap-4 max-w-4xl">
            <ForumSkeleton />
            <ForumSkeleton />
            <ForumSkeleton />
          </div>
        )}
        {!isLoading && !isFetchingCars && forums.length > 0 && (
          <ForumsLits forums={forums} />
        )}
      </div>
      {forums.length > 0 && !isFetchingCars && !isLoading && (
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
