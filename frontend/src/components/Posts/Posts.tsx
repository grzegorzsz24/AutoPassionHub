import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { useEffect, useState } from "react";

import AddPost from "./AddPost";
import Post from "./Post";
import PostModel from "../../models/PostModel";
import { getPosts } from "../../services/postService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";

// const posts = [
//   {
//     firstName: "John",
//     lastName: "Doe",
//     nickname: "jdoe",
//     avatar: "anonim.webp",
//     createdAt: "2023-10-20T16:00:00Z",
//     content: "Moja nowa fura jest super kozacka",
//     photos: ["1155344.jpg", "1155344.jpg", "1155344.jpg"],
//     liked: true,
//     likes: 10,
//     comments: 2,
//   },
//   {
//     firstName: "Grzegorz",
//     lastName: "Szymanek",
//     nickname: "gszymanek",
//     avatar: "anonim.webp",
//     createdAt: "2023-10-18T15:30:00Z",
//     content: "Stuningowałem maluszka. Co o tym sądzicie?",
//     photos: ["1155344.jpg", "1155344.jpg"],
//     liked: false,
//     likes: 123,
//     comments: 12,
//   },
//   {
//     firstName: "John",
//     lastName: "Doe",
//     nickname: "jdoe",
//     avatar: "anonim.webp",
//     createdAt: "2023-10-20T16:00:00Z",
//     content: "Moja nowa fura jest super kozacka",
//     photos: ["1155344.jpg", "1155344.jpg", "1155344.jpg"],
//     liked: true,
//     likes: 10,
//     comments: 2,
//   },
//   {
//     firstName: "Grzegorz",
//     lastName: "Szymanek",
//     nickname: "gszymanek",
//     avatar: "anonim.webp",
//     createdAt: "2023-10-18T15:30:00Z",
//     content: "Stuningowałem maluszka. Co o tym sądzicie?",
//     photos: ["1155344.jpg", "1155344.jpg"],
//     liked: false,
//     likes: 123,
//     comments: 12,
//   },
//   {
//     firstName: "John",
//     lastName: "Doe",
//     nickname: "jdoe",
//     avatar: "anonim.webp",
//     createdAt: "2021-10-19T12:00:00Z",
//     content: "Moja nowa fura jest super kozacka",
//     photos: ["1155344.jpg"],
//     liked: true,
//     likes: 10,
//     comments: 2,
//   },
//   {
//     firstName: "John",
//     lastName: "Doe",
//     nickname: "jdoe",
//     avatar: "anonim.webp",
//     createdAt: "2021-10-19T12:00:00Z",
//     content: "Moja nowa fura jest super kozacka",
//     photos: ["1155344.jpg", "anonim.webp", "1155344.jpg", "anonim.webp"],
//     liked: true,
//     likes: 10,
//     comments: 2,
//   },
//   {
//     firstName: "John",
//     lastName: "Doe",
//     nickname: "jdoe",
//     avatar: "anonim.webp",
//     createdAt: "2021-10-19T12:00:00Z",
//     content: "Moja nowa fura jest super kozacka",
//     photos: [
//       "1155344.jpg",
//       "anonim.webp",
//       "1155344.jpg",
//       "anonim.webp",
//       "1155344.jpg",
//     ],
//     liked: true,
//     likes: 10,
//     comments: 2,
//   },
// ];

const Posts = () => {
  const dispatch = useAppDispatch();
  const [posts, setPosts] = useState<PostModel[]>([]);

  const downloadPosts = async () => {
    try {
      const data = await getPosts();
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      setPosts(data.posts);
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    }
  };

  useEffect(() => {
    downloadPosts();
  }, []);

  return (
    <div className="bg-gears-light dark:bg-gears-dark bg-no-repeat bg-contain bg-center gap-8 items-center overflow-y-auto h-full flex-grow">
      <div className="flex flex-col items-center gap-12 py-12">
        <AddPost />
        {posts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            content={post.content}
            postedAt={post.postedAt}
            file={post.file}
            user={post.user}
            imageUrls={post.imageUrls}
            liked={post.liked}
          />
        ))}
        {/* {posts.map((post, index) => (
          <Post
            key={index}
            firstName={post.firstName}
            lastName={post.lastName}
            nickname={post.nickname}
            avatar={post.avatar}
            createdAt={post.createdAt}
            content={post.content}
            photos={post.photos}
            liked={post.liked}
            likes={post.likes}
            comments={post.comments}
          />
        ))} */}
      </div>
    </div>
  );
};

export default Posts;
