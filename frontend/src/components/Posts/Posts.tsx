import AddPost from "./AddPost";
import Post from "./Post";

const posts = [
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "anonim.webp",
    createdAt: "2023-10-20T16:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: ["1155344.jpg", "1155344.jpg", "1155344.jpg"],
    liked: true,
    likes: 10,
    comments: 2,
  },
  {
    firstName: "Grzegorz",
    lastName: "Szymanek",
    nickname: "gszymanek",
    avatar: "anonim.webp",
    createdAt: "2023-10-18T15:30:00Z",
    content: "Stuningowałem maluszka. Co o tym sądzicie?",
    photos: ["1155344.jpg", "1155344.jpg"],
    liked: false,
    likes: 123,
    comments: 12,
  },
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "anonim.webp",
    createdAt: "2023-10-20T16:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: ["1155344.jpg", "1155344.jpg", "1155344.jpg"],
    liked: true,
    likes: 10,
    comments: 2,
  },
  {
    firstName: "Grzegorz",
    lastName: "Szymanek",
    nickname: "gszymanek",
    avatar: "anonim.webp",
    createdAt: "2023-10-18T15:30:00Z",
    content: "Stuningowałem maluszka. Co o tym sądzicie?",
    photos: ["1155344.jpg", "1155344.jpg"],
    liked: false,
    likes: 123,
    comments: 12,
  },
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "anonim.webp",
    createdAt: "2021-10-19T12:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: ["1155344.jpg"],
    liked: true,
    likes: 10,
    comments: 2,
  },
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "anonim.webp",
    createdAt: "2021-10-19T12:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: ["1155344.jpg", "anonim.webp", "1155344.jpg", "anonim.webp"],
    liked: true,
    likes: 10,
    comments: 2,
  },
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "anonim.webp",
    createdAt: "2021-10-19T12:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: [
      "1155344.jpg",
      "anonim.webp",
      "1155344.jpg",
      "anonim.webp",
      "1155344.jpg",
    ],
    liked: true,
    likes: 10,
    comments: 2,
  },
];

const Posts = () => {
  return (
    <div className="bg-gears-light dark:bg-gears-dark bg-no-repeat bg-contain bg-center gap-8 items-center overflow-y-auto h-full flex-grow">
      <div className="flex flex-col items-center gap-12 py-12">
        <AddPost />
        {posts.map((post, index) => (
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
        ))}
      </div>
    </div>
  );
};

export default Posts;
