import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import ImageResizer from "../../utils/ImageResizer";
import { MdPhoto } from "react-icons/md";
import PrimaryButton from "../../ui/PrimaryButton";
import handleError from "../../services/errorHandler";
import { updateUserImage } from "../../store/features/userSlice";
import { updateUserPhoto } from "../../services/userService";
import { useAppDispatch } from "../../store/store";
import { useState } from "react";

const UserSettingsPhoto = () => {
  const dispatch = useAppDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    URL.revokeObjectURL(imageURL!);
    setImageURL(null);
    setSelectedFile(null);
    if (!event.target.files) return;
    setSelectedFile(event.target.files![0]);
    setImageURL(URL.createObjectURL(event.target.files![0]));
  };

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;
    const resizedFile = await ImageResizer.resizeAndCropImage(
      selectedFile,
      960,
      960,
      0.8
    );
    try {
      dispatch(startLoading());
      const response = await updateUserPhoto(resizedFile);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(updateUserImage(response.imageUrl));
      dispatch(
        addNotification({
          message: response.message,
          type: NotificationStatus.SUCCESS,
        })
      );
    } catch (error) {
      const newError = handleError(error);
      dispatch(
        addNotification({
          message: newError.message,
          type: NotificationStatus.ERROR,
        })
      );
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-xl ">
      <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
        Zmień zdjęcie profilowe
      </h2>
      {selectedFile && imageURL && (
        <div className=" w-48 h-48 relative overflow-hidden rounded-full mx-auto">
          <img
            src={imageURL}
            alt=""
            className="absolute inset-0 w-full h-full object-cover "
          />
        </div>
      )}
      <form
        encType="multipart/form-data"
        className="text-primaryDark dark:text-blue-50 w-full"
        onSubmit={onFormSubmit}
      >
        <label className=" flex flex-col items-center gap-6 py-2 border-2 border-blue-600 my-4 rounded-md cursor-pointer">
          <div className="flex flex-col items-center">
            <MdPhoto className="text-2xl mb-2" />
            <span className="text-sm font-bold">Dodaj zdjęcia</span>
          </div>
          <input
            type="file"
            className="hidden"
            name="images"
            accept="image/png, image/jpeg, image/jpg"
            multiple
            onChange={onFileChange}
          ></input>
        </label>
        <input
          type="file"
          name="photo"
          id="photo"
          accept="image/*"
          placeholder="Wybierz zdjęcie"
          onChange={onFileChange}
          className="bg-red-500 p-4 rounded-md outline-none border-none hidden"
        />
        <PrimaryButton
          size="sm"
          fullWidth={true}
          disabled={selectedFile === null}
          onClick={() => {}}
          type="submit"
        >
          Zmień zdjecie
        </PrimaryButton>
      </form>
    </div>
  );
};

export default UserSettingsPhoto;
