import { FC } from "react";
import { MdPhoto } from "react-icons/md";
import PrimaryButton from "../../ui/PrimaryButton";

interface AddUserPhotoFormProps {
  onFormSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedFile: File | null;
}

const AddUserPhotoForm: FC<AddUserPhotoFormProps> = ({
  onFormSubmit,
  onFileChange,
  selectedFile,
}) => {
  return (
    <form
      encType="multipart/form-data"
      className="w-full text-primaryDark dark:text-blue-50"
      onSubmit={onFormSubmit}
    >
      <label className=" my-4 flex cursor-pointer flex-col items-center gap-6 rounded-md border-2 border-blue-600 py-2">
        <div className="flex flex-col items-center">
          <MdPhoto className="mb-2 text-2xl" />
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
        className="hidden rounded-md border-none bg-red-500 p-4 outline-none"
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
  );
};

export default AddUserPhotoForm;
