import { FC } from "react";
import Gallery from "../Gallery";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostText from "./PostText";

// import PostPhotos from "./PostPhotos";

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
      {photos.length > 0 && (
        <div className="h-96">
          <Gallery images={photos} />
        </div>
      )}
      <PostFooter liked={liked} likes={likes} comments={comments} />
    </div>
  );
};

export default Post;
