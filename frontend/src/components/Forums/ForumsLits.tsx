import { FC } from "react";
import ForumItem from "./ForumItem";
import ForumModel from "../../models/ForumModel";

interface ForumListProps {
  forums: ForumModel[];
}

const ForumsLits: FC<ForumListProps> = ({ forums }) => {
  return (
    <div className="flex max-w-4xl flex-col gap-4">
      {forums.map((forum) => (
        <ForumItem key={forum.id} forum={forum} />
      ))}
    </div>
  );
};

export default ForumsLits;
