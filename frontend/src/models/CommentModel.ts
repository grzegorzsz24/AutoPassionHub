interface CommentModel {
  id: number;
  content: string;
  commentedAt: string;
  user: string;
  post: number;
  firstName: string;
  lastName: string;
  userImageUrl: string;
}

export default CommentModel;
