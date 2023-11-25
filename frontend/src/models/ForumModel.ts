interface ForumModel {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userId: number;
  user: string;
  commentsNumber: number;
  firstName: string;
  lastName: string;
  userImageUrl: string;
  carBrand: string;
  carModel: string;
  saved: boolean;
}

export default ForumModel;
