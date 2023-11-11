import {
  NotificationStatus,
  addNotification,
} from "../../store/features/notificationSlice";
import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import DatePicker from "react-date-picker";
import Gallery from "../../components/Gallery";
import ImageResizer from "../../utils/ImageResizer";
import { MdPhoto } from "react-icons/md";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import Validator from "../../utils/Validator";
import { createEvent } from "../../services/eventService";
import handleError from "../../services/errorHandler";
import { useAppDispatch } from "../../store/store";
import { useState } from "react";

type DatePiece = Date | null;

type DateValue = DatePiece | [DatePiece, DatePiece];

const AddEventPage = () => {
  const currentDate = new Date();
  const defaultDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
  );
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [date, setDate] = useState<DateValue>(defaultDate);
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

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setCity("");
    setDate(defaultDate);
    setSelectedFile(null);
    setImageURL(null);
  };

  const deleteImage = () => {
    URL.revokeObjectURL(imageURL!);
    setImageURL(null);
    setSelectedFile(null);
  };

  const formIsValid =
    !Validator.isEmpty(title) &&
    !Validator.isEmpty(city) &&
    !Validator.isEmpty(description) &&
    selectedFile !== null;

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(JSON.stringify(date));
    if (!selectedFile) return;

    const resizedFile = await ImageResizer.scaleDownAndReduceImageQuality(
      selectedFile,
      1920,
      1080,
      0.8
    );
    if (!date) return;

    try {
      dispatch(startLoading());
      const data = await createEvent(
        title,
        city,
        date,
        description,
        resizedFile
      );

      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      dispatch(
        addNotification({
          message: data.message,
          type: NotificationStatus.SUCCESS,
        })
      );
      clearForm();
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
    <div className="max-w-3xl ">
      <h2 className="font-bold text-lg mb-6 dark:text-blue-50">
        Dodaj wydarzenie
      </h2>
      {selectedFile && imageURL && (
        <div className=" h-36 relative overflow-hidden  mx-auto mb-4 md-rounded">
          <Gallery images={[imageURL]} onDeleteImage={deleteImage} />
        </div>
      )}
      <form
        encType="multipart/form-data"
        className="text-primaryDark dark:text-blue-50 w-full flex flex-col gap-4"
        onSubmit={onFormSubmit}
      >
        <TextareaAutosize
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minRows={1}
          placeholder="Tytuł"
          className="bg-white dark:bg-grayDark resize-none w-full outline-none rounded-md overflow-auto py-2 px-2 focus:ring-2 focus:ring-blue-600"
        />
        <div>
          <DatePicker
            className={
              "bg-white dark:bg-grayDark text-primaryDark dark:text-blue-600 border-none px-2 outline-none py-1 rounded-md w-full"
            }
            value={date}
            onChange={setDate}
            clearIcon={null}
            minDate={defaultDate}
            dayAriaLabel={"Dzień urodzenia"}
            monthAriaLabel={"Miesiąc urodzenia"}
            yearAriaLabel={"Rok urodzenia"}
          />
        </div>
        <TextareaAutosize
          value={city}
          onChange={(e) => setCity(e.target.value)}
          minRows={1}
          placeholder="Miejsce wydarzenia"
          className="bg-white dark:bg-grayDark resize-none w-full outline-none rounded-md overflow-auto py-2 px-2 focus:ring-2 focus:ring-blue-600"
        />
        <TextareaAutosize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={5}
          placeholder="Szczegóły wydarzenia"
          className="bg-white dark:bg-grayDark resize-none w-full outline-none rounded-md overflow-auto py-2 px-2 focus:ring-2 focus:ring-blue-600"
        />
        <label className=" flex flex-col items-center gap-6 py-2 border-2 border-blue-600 my-4 rounded-md cursor-pointer">
          <div className="flex flex-col items-center">
            <MdPhoto className="text-2xl mb-2" />
            <span className="text-sm font-bold">
              {selectedFile ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
            </span>
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
          disabled={!formIsValid}
          onClick={() => {}}
          type="submit"
        >
          Dodaj wydarzenie
        </PrimaryButton>
      </form>
    </div>
  );
};

export default AddEventPage;
