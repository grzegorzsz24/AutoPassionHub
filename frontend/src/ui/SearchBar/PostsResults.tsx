import { FC } from "react";
import { IoMdPhotos } from "react-icons/io";
import { NavLink } from "react-router-dom";
import PostModel from "../../models/PostModel";

interface PostsResultsProps {
  posts: PostModel[];
}

const PostsResults: FC<PostsResultsProps> = ({ posts }) => {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id} className="py-1">
          <NavLink
            to={`/posts/${post.id}`}
            className=" py-2 px-4 hover:bg-blue-600 hover:text-blue-50 flex flex-col rounded-md"
          >
            <div className="flex items-center text-orange-500">
              <IoMdPhotos className="inline-block mr-2 " />
              <span className="text-xs">Post</span>
            </div>
            <span className="box">
              {post.content.slice(0, 40)}
              {post.content.length > 40 ? "..." : ""}
            </span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default PostsResults;
