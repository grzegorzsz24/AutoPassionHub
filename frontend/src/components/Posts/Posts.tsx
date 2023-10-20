import Post from "./Post";

const posts = [
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "path/to/john_avatar.jpg",
    createdAt: "2023-10-20T16:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: ["path/to/photo1.jpg", "path/to/photo2.jpg"],
    liked: true,
    likes: 10,
    comments: 2,
  },
  {
    firstName: "Grzegorz",
    lastName: "Szymanek",
    nickname: "gszymanek",
    avatar: "path/to/grzegorz_avatar.jpg",
    createdAt: "2023-10-18T15:30:00Z",
    content: "Stuningowałem maluszka. Co o tym sądzicie?",
    photos: ["path/to/photo3.jpg", "path/to/photo4.jpg"],
    liked: false,
    likes: 123,
    comments: 12,
  },
  {
    firstName: "John",
    lastName: "Doe",
    nickname: "jdoe",
    avatar: "path/to/john_avatar.jpg",
    createdAt: "2021-10-19T12:00:00Z",
    content: "Moja nowa fura jest super kozacka",
    photos: ["path/to/photo1.jpg", "path/to/photo2.jpg"],
    liked: true,
    likes: 10,
    comments: 2,
  },
];

const Posts = () => {
  return (
    <div className="bg-gears-light dark:bg-gears-dark bg-no-repeat bg-contain bg-center gap-8 items-center overflow-y-auto h-full flex-grow">
      <div className="flex flex-col items-center gap-12 py-12">
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
