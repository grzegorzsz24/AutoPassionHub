import { FC, useEffect, useRef, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

import { IoMdCloseCircle } from "react-icons/io";

interface GalleryProps {
  images: string[] | File[];
  onDeleteImage?: (index: number) => void;
}

const layout = [
  {
    imagesLength: 1,
    containerClassName: "",
    elementsClassName: [""],
  },
  {
    imagesLength: 2,
    containerClassName: "grid-cols-2",
    elementsClassName: ["col-span-1", "col-span-1"],
  },
  {
    imagesLength: 3,
    containerClassName: "grid-cols-2",
    elementsClassName: ["col-span-1", "col-span-1", "col-span-2"],
  },
  {
    imagesLength: 4,
    containerClassName: "grid-cols-2",
    elementsClassName: ["col-span-1", "col-span-1", "col-span-1", "col-span-1"],
  },
  {
    imagesLength: 5,
    containerClassName: "grid-cols-3 grid-rows-2",
    elementsClassName: [
      "col-span-1 row-span-2",
      "col-span-1",
      "col-span-1",
      "col-span-1",
      "col-span-1",
    ],
  },
  {
    imagesLength: 6, // > 5
    containerClassName: "grid-cols-2",
    elementsClassName: ["col-span-1"],
  },
];

const Gallery: FC<GalleryProps> = ({ images, onDeleteImage: deleteImage }) => {
  const modalRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const currentImage = images[currentPhotoIndex];
  const imageSrc =
    typeof currentImage === "string"
      ? currentImage
      : URL.createObjectURL(currentImage);

  const openPhoto = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsOpen(true);
  };

  const closePhoto = () => {
    setIsOpen(false);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length,
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

  const handleOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && event.target === modalRef.current) {
      closePhoto();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div
      className={`grid h-full w-full gap-2 ${
        images.length > 5
          ? layout[5].containerClassName
          : layout[images.length - 1].containerClassName
      }`}
    >
      {images.map((image, index) => (
        <div
          className={`relative overflow-hidden ${
            images.length > 5
              ? layout[5].elementsClassName[index]
              : layout[images.length - 1].elementsClassName[index]
          }`}
          key={image.toString() + index}
        >
          <img
            src={image instanceof File ? URL.createObjectURL(image) : image}
            alt={`Zdjęcie ${index} galerii`}
            loading="lazy"
            className="absolute inset-0 h-full w-full cursor-pointer object-cover"
            onClick={() => openPhoto(index)}
          />

          {deleteImage && (
            <button
              aria-label="Usuń zdjęcie"
              className="absolute right-4 top-4 text-2xl text-blue-50 transition-all hover:text-red-600"
              onClick={() => deleteImage(index)}
            >
              <IoMdCloseCircle />
            </button>
          )}
        </div>
      ))}
      {isOpen && (
        <div
          ref={modalRef}
          className={`fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-90 px-4 py-4  backdrop-blur-sm backdrop:blur-sm md:px-16`}
        >
          <img src={imageSrc} alt="" className="max-h-[80%] " />

          <button
            aria-label="Zamknij galerię"
            onClick={closePhoto}
            className="absolute right-8 top-8 text-4xl text-blue-50 transition-all hover:text-blue-600"
          >
            <IoMdCloseCircle />
          </button>
          {images.length > 1 && (
            <div className="absolute bottom-8 right-1/2 flex translate-x-1/2 items-center gap-8">
              <button
                aria-label="Poprzednie zdjęcie"
                onClick={prevPhoto}
                className="text-4xl text-blue-50 transition-all hover:text-blue-600"
              >
                <FaArrowAltCircleLeft />
              </button>
              <p className=" text-blue-50">
                {currentPhotoIndex + 1} / {images.length}
              </p>{" "}
              <button
                aria-label="Następne zdjęcie"
                onClick={nextPhoto}
                className="text-4xl text-blue-50 transition-all hover:text-blue-600"
              >
                <FaArrowAltCircleRight />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gallery;
