interface PostModel {
  id: number;
  content: string;
  postedAt: string;
  file: string | null;
  userId: number;
  user: string;
  imageUrls: string[];
  likesNumber: number;
  commentsNumber: number;
  firstName: string;
  lastName: string;
  userImageUrl: string;
  liked: boolean;
}

export default PostModel;
