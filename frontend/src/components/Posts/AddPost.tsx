import { FC, useCallback, useState } from "react";
import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import Gallery from "../Gallery";
import ImageResizer from "../../utils/ImageResizer";
import { MdPhoto } from "react-icons/md";
import PostModel from "../../models/PostModel";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { createPost } from "../../services/postService";
import handleError from "../../services/errorHandler";

interface AddPostProps {
  addPostToList: (post: PostModel) => void;
}

const AddPost: FC<AddPostProps> = ({ addPostToList }) => {
  const dispatch = useAppDispatch();
  const { imageUrl, firstName } = useAppSelector((state) => state.user);
  const [postText, setPostText] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<
    { file: File; url: string }[]
  >([]);
  const formIsValid = selectedImages.length <= 5;

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    const selectedFilesArray = Array.from(selectedFiles!).filter((file) => {
      return (
        file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg"
      );
    });

    const imagesArray = selectedFilesArray.map((file) => {
      return { file, url: URL.createObjectURL(file) };
    });

    setSelectedImages((prev) => [...prev, ...imagesArray]);
  };

  const deleteImage = useCallback((index: number) => {
    setSelectedImages((prev) => {
      const deletedImage = prev[index];
      URL.revokeObjectURL(deletedImage.url);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const onPostTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const clearForm = () => {
    setPostText("");
    setSelectedImages([]);
  };

  const submitHandler = async () => {
    try {
      dispatch(startLoading());
      const resizedImages = await Promise.all(
        selectedImages.map((img) =>
          ImageResizer.scaleDownAndReduceImageQuality(img.file, 1920, 1080, 0.8)
        )
      );
      const data = await createPost(postText, resizedImages);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }

      dispatch(
        addNotification({
          type: NotificationStatus.SUCCESS,
          message: "Dodano post",
        })
      );
      addPostToList(data.post);
      clearForm();
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          type: NotificationStatus.ERROR,
          message: newError.message,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="bg-white dark:bg-primaryDark2 text-primaryDark dark:text-blue-50 rounded-md  py-4 max-w-2xl w-full shadow-md ">
      <div className="flex gap-6 px-4">
        <img
          src={imageUrl}
          alt="Your profile picture"
          className="w-12 h-12 rounded-full shadow-md"
        />
        <TextareaAutosize
          value={postText}
          onChange={onPostTextChange}
          //   maxLength={300}
          minRows={2}
          placeholder={`Co słychać, ${firstName}?`}
          className="bg-transparent resize-none w-full outline-none border-none rounded-md overflow-auto py-2 px-2 mb-2 focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {selectedImages.length > 0 && (
        <div className="h-96 border-t-2 pt-2 border-blue-600">
          <Gallery
            images={selectedImages.map((img) => img.url)}
            onDeleteImage={deleteImage}
          />
        </div>
      )}
      <div className="px-4">
        <label className=" flex flex-col items-center gap-6 py-2 border-2 border-blue-600 my-4 rounded-md cursor-pointer">
          <div className="flex flex-col items-center">
            <MdPhoto className="text-2xl mb-2" />
            <span className="text-sm font-bold">Dodaj zdjęcia</span>
            <span className="text-xs">(Maksymalnie 5 zdjęć)</span>
            {selectedImages.length > 0 && (
              <span className="my-4 text-sm">
                Wybrano {selectedImages.length}{" "}
                {selectedImages.length === 1
                  ? "zdjęcie"
                  : selectedImages.length === 5
                  ? "zdjęć"
                  : "zdjęcia"}
              </span>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            name="images"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={onSelectFile}
          ></input>
        </label>
        <PrimaryButton
          size="sm"
          fullWidth={true}
          disabled={!formIsValid}
          onClick={submitHandler}
        >
          Dodaj post
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddPost;
