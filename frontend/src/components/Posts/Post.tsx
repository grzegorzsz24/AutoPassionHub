import { FC } from "react";
import PostHeader from "./PostHeader";
import PostPhotos from "./PostPhotos";
import PostText from "./PostText";

interface PostProps {
  firstName: string;
  lastName: string;
  nickname: string;
  avatar: string;
  createdAt: string;
  content: string;
  photos: string[];
  liked: boolean;
  likes: number;
  comments: number;
}

const Post: FC<PostProps> = ({
  firstName,
  lastName,
  nickname,
  avatar,
  createdAt,
  content,
  photos,
  liked,
  likes,
  comments,
}) => {
  //   const [commentsAreShown, setCommentsAreShown] = useState(false);
  //   const [downloadingComments, setDownloadingComments] = useState(false);

  return (
    <div className="bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-100 max-w-2xl w-full rounded-md shadow-md">
      <PostHeader
        firstName={firstName}
        lastName={lastName}
        nickname={nickname}
        avatar={avatar}
        createdAt={createdAt}
      />
      <PostText text={content} />
      {photos.length > 0 && <PostPhotos photos={photos} />}
      <div>
        <p>{liked ? "Liked" : "Not liked"}</p>
        <p>{likes} likes</p>
        <p>{comments} comments</p>
      </div>
    </div>
  );
};

export default Post;
