import { FC, useState } from "react";

import LoadingSpinner from "../../ui/LoadingSpinner";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { useAppSelector } from "../../store/store";

interface AddCommentProps {
  //   postId: number;
  addCommentHandler: (content: string) => void;
  isLoading: boolean;
}

const AddComment: FC<AddCommentProps> = ({ addCommentHandler, isLoading }) => {
  const { firstName, imageUrl } = useAppSelector((state) => state.user);
  const [commentText, setCommentText] = useState<string>("");

  const formIsValid = commentText.trim() !== "" && commentText.length <= 500;

  const onCommentTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const clearForm = () => {
    setCommentText("");
  };

  const onFormSubmitHandler = () => {
    if (!formIsValid) {
      return;
    }
    addCommentHandler(commentText);
    clearForm();
  };

  if (isLoading) return <LoadingSpinner small />;

  return (
    <div className="w-full rounded-md bg-grayLight p-4 text-primaryDark  shadow-md  dark:bg-primaryDark dark:text-blue-50 ">
      <div className="mb-4 flex gap-6 px-4">
        <img
          src={imageUrl}
          alt="Your profile picture"
          className="h-8 w-8 rounded-full shadow-md"
        />
        <TextareaAutosize
          value={commentText}
          onChange={onCommentTextChange}
          //   maxLength={300}
          placeholder={`Napisz komentarz ${firstName}...`}
          className="w-full resize-none overflow-auto rounded-md border-none bg-transparent px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>
      <PrimaryButton
        size="sm"
        fullWidth={true}
        disabled={!formIsValid}
        onClick={onFormSubmitHandler}
      >
        Dodaj komentarz
      </PrimaryButton>
    </div>
  );
};

export default AddComment;
