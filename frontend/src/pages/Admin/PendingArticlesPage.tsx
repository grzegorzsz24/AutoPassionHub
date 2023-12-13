const ARTICLES_PER_PAGE = import.meta.env.VITE_ARTICLES_PER_PAGE as number;

import {
  approveArticle,
  getArticlesWaitingForApproval,
  rejectArticle,
} from "../../services/adminService";
import { useEffect, useReducer, useState } from "react";

import ArticleModel from "../../models/ArticleModel";
import ArticleSkeleton from "../../components/Articles/ArticleSkeleton";
import NoContent from "../../ui/NoContent";
import Pagination from "../../components/Pagination";
import PendingArticleItem from "../../components/Articles/PendingArticleItem";
import articleFilterReducer from "../../reducers/ArticlePaginationReducer";
import { useAppSelector } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";
import { useSearchParams } from "react-router-dom";
import { useStompClient } from "react-stomp-hooks";

const PendingArticlesPage = () => {
  const { userId: loggedInUserId } = useAppSelector((state) => state.user);
  const stompClient = useStompClient();
  const { showErrorNotification, showSuccessNotification } = useNotification();
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
      const data = await getArticlesWaitingForApproval(page, size);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles(data.data);
      setTotalNumberOfArticles(data.totalNumberOfArticles);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      setIsLoading(false);
    }
  };

  const aprooveArticleHandler = async (id: number, userId: number) => {
    try {
      const data = await approveArticle(id);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      showSuccessNotification("Artykuł został zatwierdzony");
      if (stompClient) {
        stompClient.publish({
          destination: `/app/article/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: userId,
            content: "Artykuł został zatwierdzony",
            type: "ARTICLE_APPROVED",
            entityId: id,
          }),
        });
      }
      if (articles.length <= 1 && page !== 1) {
        filterDispatch({ type: "SET_PAGE", payload: page - 1 });
        setParams(buildQueryParams());
      }
    } catch (error) {
      showErrorNotification(error);
    }
  };

  const rejectArticleHandler = async (id: number, userId: number) => {
    try {
      const data = await rejectArticle(id);
      if (data.status !== "ok") throw new Error(data.message);
      setArticles((prev) => prev.filter((article) => article.id !== id));
      showSuccessNotification("Artykuł został odrzucony");
      if (stompClient) {
        stompClient.publish({
          destination: `/app/article/notification`,
          body: JSON.stringify({
            userTriggeredId: Number(loggedInUserId),
            receiverId: userId,
            content: "Artykuł został odrzucony",
            type: "ARTICLE_DELETED",
            entityId: id,
          }),
        });
      }
      if (articles.length <= 1 && page !== 1) {
        filterDispatch({ type: "SET_PAGE", payload: page - 1 });
        setParams(buildQueryParams());
      }
    } catch (error) {
      showErrorNotification(error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, [filterState]);

  return (
    <div className="flex h-full max-w-4xl flex-col justify-between">
      <div className="flex flex-col  gap-12">
        {isLoading ? (
          <div className="flex max-w-4xl flex-col gap-4">
            <ArticleSkeleton />
            <ArticleSkeleton />
            <ArticleSkeleton />
          </div>
        ) : (
          <div className="flex flex-col gap-4 ">
            {articles.map((article) => (
              <PendingArticleItem
                key={article.id}
                article={article}
                approveArticle={aprooveArticleHandler}
                rejectArticle={rejectArticleHandler}
              />
            ))}
          </div>
        )}
        {!isLoading && articles.length === 0 && (
          <NoContent>Brak artykułów</NoContent>
        )}
      </div>
      {!isLoading && articles.length > 0 && (
        <div className="my-4 flex items-center justify-center">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalNumberOfArticles / size)}
            goToPage={(page: number) =>
              filterDispatch({ type: "SET_PAGE", payload: page })
            }
          />
        </div>
      )}
    </div>
  );
};

export default PendingArticlesPage;
