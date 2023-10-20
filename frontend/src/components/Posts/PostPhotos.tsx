import { FC, useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { IoMdCloseCircle } from "react-icons/io";

interface PostPhotosProps {
  photos: string[];
}

const PostPhotos: FC<PostPhotosProps> = ({ photos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const openPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsOpen(true);
  };

  const closePhoto = () => {
    setIsOpen(false);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + photos.length) % photos.length
    );
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isOpen) {
      switch (event.key) {
        case "ArrowLeft":
          prevPhoto();
          break;
        case "ArrowRight":
          nextPhoto();
          break;
        case "Escape":
          closePhoto();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const renderPhotos = () => {
    switch (photos.length) {
      case 1:
        return (
          <div className="grid h-full w-full">
            <div className=" relative overflow-hidden">
              <img
                src={photos[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(0)}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="grid grid-cols-2 h-full w-full  gap-2">
            <div className="col-span-1  relative overflow-hidden">
              <img
                src={photos[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(0)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden ">
              <img
                src={photos[1]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(1)}
              />
            </div>
          </div>
        );
      case 3:
        console.log(photos);
        return (
          <div className="grid grid-cols-2 h-full w-full  gap-2">
            <div className="col-span-1  relative overflow-hidden">
              <img
                src={photos[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(0)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden ">
              <img
                src={photos[1]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(1)}
              />
            </div>
            <div className="col-span-2 relative overflow-hidden">
              <img
                src={photos[2]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 h-full w-full  gap-2">
            <div className="col-span-1  relative overflow-hidden">
              <img
                src={photos[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(0)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden ">
              <img
                src={photos[1]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(1)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden">
              <img
                src={photos[2]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden">
              <img
                src={photos[3]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="grid grid-cols-3 grid-rows-2 h-full w-full gap-2">
            <div className="col-span-1 row-span-2 relative overflow-hidden">
              <img
                src={photos[0]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(0)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden ">
              <img
                src={photos[1]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(1)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden">
              <img
                src={photos[2]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden">
              <img
                src={photos[3]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
            <div className="col-span-1 relative overflow-hidden">
              <img
                src={photos[4]}
                alt=""
                className="absolute inset-0 w-full h-full object-cover cursor-pointer"
                onClick={() => openPhoto(2)}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      <div className="h-96">{renderPhotos()}</div>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 w-full h-screen bg-black bg-opacity-80 backdrop:blur-sm py-4 px-32 rounded-md flex items-center ${
            photos.length > 1 ? "justify-between" : "justify-center"
          }`}
        >
          {photos.length > 1 && (
            <button
              onClick={prevPhoto}
              className="text-4xl text-blue-50 hover:text-blue-600 transition-all"
            >
              <FaArrowAltCircleLeft />
            </button>
          )}
          <img src={photos[currentPhotoIndex]} alt="" className="max-h-[80%]" />
          {photos.length > 1 && (
            <button
              onClick={nextPhoto}
              className="text-4xl text-blue-50 hover:text-blue-600 transition-all"
            >
              <FaArrowAltCircleRight />
            </button>
          )}

          <button
            onClick={closePhoto}
            className="absolute top-10 right-10 text-4xl text-blue-50 hover:text-blue-600 transition-all"
          >
            <IoMdCloseCircle />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPhotos;
