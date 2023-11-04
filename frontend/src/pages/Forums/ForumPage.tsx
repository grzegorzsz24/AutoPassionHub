import { useParams } from "react-router-dom";
import { useState } from "react";

const ForumPage = () => {
  const { forum: forumID } = useParams<{ forum: string }>();

  return <div>forum</div>;
};

export default ForumPage;
