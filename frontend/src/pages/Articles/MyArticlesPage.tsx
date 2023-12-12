import { useEffect, useReducer, useState } from "react";

import ArticleList from "../../components/Articles/ArticleList";
import ArticleModel from "../../models/ArticleModel";
import ArticleSkeleton from "../../components/Articles/ArticleSkeleton";
import NoContent from "../../ui/NoContent";
import Pagination from "../../components/Pagination";
import articleFilterReducer from "../../reducers/ArticlePaginationReducer";
import { getMyArticles } from "../../services/articleService";
import { useNotification } from "../../hooks/useNotification";
import { useSearchParams } from "react-router-dom";

const ARTICLES_PER_PAGE = import.meta.env.VITE_ARTICLES_PER_PAGE as number;

const MyArticlesPage = () => {
  const { showErrorNotification } = useNotification();
  const [params, setParams] = useSearchParams();
  const [articles, setArticles] = useState<ArticleModel[]>([]);
  const [totalNumberOfArticles, setTotalNumberOfArticles] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const setFiltersFromParams = () => {
    return {
      page: getPageFromParams(),
      size: ARTICLES_PER_PAGE,
      title: "",
    };
  };

  const getPageFromParams = () => {
    let page = Number(params.get("page")) || 1;
    if (page < 1) page = 1;
    return page;
  };

  const [filterState, filterDispatch] = useReducer(
    articleFilterReducer,
    setFiltersFromParams(),
  );

  const { page, size } = filterState;

  const buildQueryParams = () => {
    let queryParams = "";
    queryParams += `page=${page}`;
    return queryParams;
  };

  const fetchArticles = async () => {
    try {
      setIsLoading(true);
      setParams(buildQueryParams());
      const data = await getMyArticles(page, size);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles(data.data);
      setTotalNumberOfArticles(data.totalNumberOfArticles);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filterState]);

  return (
    <div className="flex h-full max-w-4xl flex-col justify-between">
      <div className="flex flex-col gap-12">
        {!isLoading && articles.length === 0 && (
          <NoContent>Brak artykułów</NoContent>
        )}
        {isLoading ? (
          <div className="flex max-w-4xl flex-col gap-4">
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </div>
        ) : (
          <ArticleList articles={articles} />
        )}
      </div>
      {!isLoading && articles.length > 0 && (
        <div className=" my-4 flex items-center justify-center">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalNumberOfArticles / ARTICLES_PER_PAGE)}
            goToPage={(page: number) =>
              filterDispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      )}
    </div>
  );
};

export default MyArticlesPage;
