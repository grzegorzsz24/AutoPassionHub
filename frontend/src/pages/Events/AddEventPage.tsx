import { startLoading, stopLoading } from "../../store/features/loadingSlice";

import DatePicker from "react-date-picker";
import Gallery from "../../components/Gallery";
import ImageResizer from "../../utils/ImageResizer";
import { MdPhoto } from "react-icons/md";
import PrimaryButton from "../../ui/PrimaryButton";
import TextareaAutosize from "react-textarea-autosize";
import Validator from "../../utils/Validator";
import { createEvent } from "../../services/eventService";
import { useAppDispatch } from "../../store/store";
import { useNotification } from "../../hooks/useNotification";
import { useState } from "react";

type DatePiece = Date | null;

type DateValue = DatePiece | [DatePiece, DatePiece];

const AddEventPage = () => {
  const currentDate = new Date();
  const defaultDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
  );
  const { showErrorNotification, showSuccessNotification } = useNotification();
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
    try {
      URL.revokeObjectURL(imageURL!);
      setImageURL(null);
      setSelectedFile(null);
    } catch (error) {
      showErrorNotification(error);
    }
  };

  const formIsValid =
    !Validator.isEmpty(title) &&
    !Validator.isEmpty(city) &&
    !Validator.isEmpty(description) &&
    selectedFile !== null;

  const onFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    const resizedFile = await ImageResizer.scaleDownAndReduceImageQuality(
      selectedFile,
      1920,
      1080,
      0.8,
    );
    if (!date) return;

    try {
      dispatch(startLoading());
      const data = await createEvent(
        title,
        city,
        date,
        description,
        resizedFile,
      );

      if (data.status !== "ok") {
        throw new Error(data.message);
      }
      showSuccessNotification(data.message);
      clearForm();
    } catch (error) {
      showErrorNotification(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="max-w-3xl ">
      <h2 className="mb-6 text-lg font-bold dark:text-blue-50">
        Dodaj wydarzenie
      </h2>
      {selectedFile && imageURL && (
        <div className=" md-rounded relative mx-auto  mb-4 h-36 overflow-hidden">
          <Gallery images={[imageURL]} onDeleteImage={deleteImage} />
        </div>
      )}
      <form
        encType="multipart/form-data"
        className="flex w-full flex-col gap-4 text-primaryDark dark:text-blue-50"
        onSubmit={onFormSubmit}
      >
        <TextareaAutosize
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          minRows={1}
          placeholder="Tytuł"
          className="w-full resize-none overflow-auto rounded-md bg-white px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600 dark:bg-grayDark"
        />
        <div>
          <DatePicker
            className={
              "w-full rounded-md border-none bg-white px-2 py-1 text-primaryDark outline-none dark:bg-grayDark dark:text-blue-600"
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
          className="w-full resize-none overflow-auto rounded-md bg-white px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600 dark:bg-grayDark"
        />
        <TextareaAutosize
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          minRows={5}
          placeholder="Szczegóły wydarzenia"
          className="w-full resize-none overflow-auto rounded-md bg-white px-2 py-2 outline-none focus:ring-2 focus:ring-blue-600 dark:bg-grayDark"
        />
        <label className=" my-4 flex cursor-pointer flex-col items-center gap-6 rounded-md border-2 border-blue-600 py-2">
          <div className="flex flex-col items-center">
            <MdPhoto className="mb-2 text-2xl" />
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
          className="hidden rounded-md border-none bg-red-500 p-4 outline-none"
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
