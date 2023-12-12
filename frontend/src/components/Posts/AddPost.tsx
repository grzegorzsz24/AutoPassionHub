import { FC, useCallback, useState } from "react";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";
import { useAppDispatch, useAppSelector } from "../../store/store";

import Gallery from "../Gallery";
import ImageResizer from "../../utils/ImageResizer";
import { MdPhoto } from "react-icons/md";
import PostModel from "../../models/PostModel";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import { createPost } from "../../services/postService";
import { useNotification } from "../../hooks/useNotification";

interface AddPostProps {
  addPostToList: (post: PostModel) => void;
}

const AddPost: FC<AddPostProps> = ({ addPostToList }) => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();
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
          ImageResizer.scaleDownAndReduceImageQuality(
            img.file,
            1920,
            1080,
            0.8,
          ),
        ),
      );
      const data = await createPost(postText, resizedImages);
      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      showSuccessNotification(data.message);
      addPostToList(data.post);
      clearForm();
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white py-4 text-primaryDark  shadow-md dark:bg-primaryDark2 dark:text-blue-50 sm:rounded-md ">
      <div className="flex gap-2 px-2 sm:gap-6 sm:px-4">
        <img
          src={imageUrl}
          alt="Your profile picture"
          className="h-8 w-8 rounded-full shadow-md sm:h-12 sm:w-12"
        />
        <TextareaAutosize
          value={postText}
          onChange={onPostTextChange}
          //   maxLength={300}
          minRows={2}
          placeholder={`Co słychać, ${firstName}?`}
          className="sm:text-md mb-2 w-full resize-none overflow-auto rounded-md border-none bg-transparent p-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
        />
      </div>

      {selectedImages.length > 0 && (
        <div className="h-96 border-t-2 border-blue-600 pt-2">
          <Gallery
            images={selectedImages.map((img) => img.url)}
            onDeleteImage={deleteImage}
          />
        </div>
      )}
      <div className="px-2 sm:px-4">
        <label className=" my-2 flex cursor-pointer flex-col items-center gap-6 rounded-md border-2 border-blue-600 py-2 sm:my-4">
          <div className="flex flex-col items-center">
            <MdPhoto className="mb-2 text-lg sm:text-2xl" />
            <span className="text-xs font-bold sm:text-sm">Dodaj zdjęcia</span>
            <span className="text-xs">(Maksymalnie 5 zdjęć)</span>
            {selectedImages.length > 0 && (
              <span className="my-4 text-xs sm:text-sm">
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
