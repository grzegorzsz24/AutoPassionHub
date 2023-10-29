import { FC, useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";

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
    <div className="flex flex-col gap-6 px-4">
      <textarea
        value={content}
        onChange={onChangeHandler}
        className="bg-transparent resize-none w-full outline-none border-none rounded-md h-32  overflow-auto py-2 px-2 mb-2 focus:ring-2 focus:ring-blue-600"
      />
      <div className="flex flex-col gap-2 mb-2">
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
