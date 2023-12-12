import { FC, useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";

interface EditPostProps {
  id: number;
  currentContent: string;
  setEditMode: (value: boolean) => void;
  editPostHandler: (id: number, content: string) => void;
}

const EditPost: FC<EditPostProps> = ({
  id,
  currentContent,
  setEditMode,
  editPostHandler,
}) => {
  const [content, setContent] = useState(currentContent);

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  return (
    <div className="flex flex-col gap-2 px-2 sm:gap-6 sm:px-4">
      <TextareaAutosize
        value={content}
        onChange={onChangeHandler}
        //   maxLength={300}
        minRows={2}
        className="sm:text-md mb-2 w-full resize-none overflow-auto rounded-md border-none bg-transparent px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600 xl:text-lg"
      />
      <div className="mb-2 flex flex-col gap-2">
        <PrimaryButton
          onClick={() => {
            editPostHandler(id, content);
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

export default EditPost;
