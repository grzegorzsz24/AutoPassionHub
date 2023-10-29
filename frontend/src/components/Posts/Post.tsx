import { FC } from "react";
import Gallery from "../Gallery";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostModel from "../../models/PostModel";
import PostText from "./PostText";

const API_URL = import.meta.env.VITE_API_URL as string;

// import PostPhotos from "./PostPhotos";

// interface PostProps {
//   firstName: string;
//   lastName: string;
//   nickname: string;
//   avatar: string;
//   createdAt: string;
//   content: string;
//   photos: string[];
//   liked: boolean;
//   likes: number;
//   comments: number;
// }

const Post: FC<PostModel> = ({
  // id,
  content,
  postedAt,
  // file,
  user,
  imageUrls,
  liked,
}) => {
  //   const [commentsAreShown, setCommentsAreShown] = useState(false);
  //   const [downloadingComments, setDownloadingComments] = useState(false);

  return (
    <div className="bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-100 max-w-2xl w-full rounded-md shadow-md">
      <PostHeader
        firstName="XX"
        lastName="XX"
        nickname={user}
        avatar="xxx"
        createdAt={postedAt}
      />
      <PostText text={content} />
      {imageUrls.length > 0 && (
        <div className="h-96">
          <Gallery
            images={imageUrls.map((url) => `${API_URL}/images/${url}`)}
          />
        </div>
      )}
      <PostFooter liked={liked} likes={22} comments={8} />
    </div>
  );
};

export default Post;
