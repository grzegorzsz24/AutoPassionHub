import { useCallback, useState } from "react";

import Gallery from "../Gallery";
import { MdPhoto } from "react-icons/md";
import PrimaryButton from "../../ui/PrimaryButton";

const AddPost = () => {
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

  return (
    <div className="bg-white dark:bg-primaryDark2 text-primaryDark dark:text-blue-50 rounded-md  py-4 max-w-2xl w-full shadow-md ">
      <div className="flex gap-6 px-4">
        <img
          src="anonim.webp"
          alt=""
          className="w-12 h-12 rounded-full shadow-md"
        />
        <textarea
          name=""
          id=""
          placeholder="Co słychać?"
          className="bg-transparent resize-none w-full outline-none border-none rounded-md h-32  overflow-auto py-2 px-2 focus:ring-2 focus:ring-blue-600"
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
          onClick={() => {}}
        >
          Dodaj post
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddPost;
