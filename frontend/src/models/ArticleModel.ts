interface ArticleModel {
  id: number;
  title: string;
  content: string;
  publishedAt: string;
  user: string;
  firstName: string;
  lastName: string;
  userImageUrl: string;
  likesNumber: number;
  liked: boolean;
  saved: boolean;
}

export default ArticleModel;
