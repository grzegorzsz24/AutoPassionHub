import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import AddUserPhotoForm from "../../components/Forms/AddUserPhotoForm";
import ImageResizer from "../../utils/ImageResizer";
import { updateUserImage } from "../../store/features/userSlice";
import { updateUserPhoto } from "../../services/userService";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";
import { useState } from "react";

const UserSettingsPhoto = () => {
  const dispatch = useAppDispatch();
  const { showErrorNotification, showSuccessNotification } = useNotification();
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
      0.8,
    );
    try {
      dispatch(startLoading());
      const response = await updateUserPhoto(resizedFile);
      if (response.status !== "ok") {
        throw new Error(response.message);
      }
      dispatch(updateUserImage(response.imageUrl));
      showSuccessNotification(response.message);
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-xl ">
      <h2 className="mb-6 text-lg font-bold dark:text-blue-50">
        Zmień zdjęcie profilowe
      </h2>
      {selectedFile && imageURL && (
        <div className=" relative mx-auto h-48 w-48 overflow-hidden rounded-full">
          <img
            src={imageURL}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      )}
      <AddUserPhotoForm
        onFormSubmit={onFormSubmit}
        onFileChange={onFileChange}
        selectedFile={selectedFile}
      />
    </div>
  );
};

export default UserSettingsPhoto;
