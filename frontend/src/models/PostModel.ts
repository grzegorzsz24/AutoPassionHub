interface PostModel {
  id: number;
  content: string;
  postedAt: string;
  file: string | null;
  user: string;
  imageUrls: string[];
  liked: boolean;
}

export default PostModel;
