import { FC, useState } from "react";

import EditPost from "./EditPost";
import Gallery from "../Gallery";
import PostFooter from "./PostFooter";
import PostHeader from "./PostHeader";
import PostModel from "../../models/PostModel";
import PostText from "./PostText";

interface PostProps extends PostModel {
  deletePostHandler: (id: number) => void;
  editPostHandler: (id: number, content: string) => void;
}

const Post: FC<PostProps> = ({
  id,
  content,
  postedAt,
  // file,
  user,
  imageUrls,
  likesNumber,
  commentsNumber,
  firstName,
  lastName,
  userImageUrl,
  liked,
  deletePostHandler,
  editPostHandler,
}) => {
  const [editMode, setEditMode] = useState(false);
  //   const [commentsAreShown, setCommentsAreShown] = useState(false);
  //   const [downloadingComments, setDownloadingComments] = useState(false);

  return (
    <div className="bg-white text-primaryDark dark:bg-primaryDark2 dark:text-blue-100 max-w-2xl w-full rounded-md shadow-md">
      <PostHeader
        id={id}
        firstName={firstName}
        lastName={lastName}
        nickname={user}
        avatar={userImageUrl}
        createdAt={postedAt}
        deletePostHandler={deletePostHandler}
        setEditMode={setEditMode}
      />
      {!editMode && <PostText text={content} />}
      {editMode && (
        <EditPost
          id={id}
          currentContent={content}
          setEditMode={setEditMode}
          editPostHandler={editPostHandler}
        />
      )}
      {imageUrls.length > 0 && (
        <div className="h-96">
          <Gallery images={imageUrls} />
        </div>
      )}
      <PostFooter liked={liked} likes={likesNumber} comments={commentsNumber} />
    </div>
  );
};

export default Post;
