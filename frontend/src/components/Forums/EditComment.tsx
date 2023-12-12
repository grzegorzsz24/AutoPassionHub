import { FC, useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";

interface EditCommentProps {
  id: number;
  currentContent: string;
  setEditMode: (value: boolean) => void;
  editCommentHandler: (id: number, content: string) => void;
}

const EditComment: FC<EditCommentProps> = ({
  id,
  currentContent,
  setEditMode,
  editCommentHandler,
}) => {
  const [content, setContent] = useState(currentContent);
  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 px-4">
      <TextareaAutosize
        value={content}
        onChange={onChangeHandler}
        className="mb-2 h-32 w-full resize-none overflow-auto rounded-md border-none  bg-transparent px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600"
      />

      <div className="mb-2 flex flex-col gap-2">
        <PrimaryButton
          onClick={() => {
            editCommentHandler(id, content);
            setEditMode(false);
          }}
          size="sm"
        >
          Zatwierdź
        </PrimaryButton>
        <PrimaryButton onClick={() => setEditMode(false)} size="sm" color="red">
          Anuluj
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EditComment;
