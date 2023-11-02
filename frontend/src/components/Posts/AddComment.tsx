import { FC, useState } from "react";

import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { useAppSelector } from "../../store/store";

interface AddCommentProps {
  //   postId: number;
  addCommentHandler: (content: string) => void;
}

const AddComment: FC<AddCommentProps> = ({ addCommentHandler }) => {
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

  return (
    <div className="bg-grayLight dark:bg-primaryDark text-primaryDark dark:text-blue-50 rounded-md  py-4 max-w-2xl w-full shadow-md ">
      <div className="flex gap-6 px-4 mb-4">
        <img
          src={imageUrl}
          alt="Your profile picture"
          className="w-8 h-8 rounded-full shadow-md"
        />
        <TextareaAutosize
          value={commentText}
          onChange={onCommentTextChange}
          //   maxLength={300}
          placeholder={`Napisz komentarz ${firstName}...`}
          className="bg-transparent resize-none w-full outline-none border-none rounded-md overflow-auto py-2 px-2 focus:ring-2 focus:ring-blue-600"
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
