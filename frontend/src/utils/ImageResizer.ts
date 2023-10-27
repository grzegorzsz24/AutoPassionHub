class ImageResizer {
  static resizeAndCropImage = async (
    file: File,
    width: number,
    height: number,
    quality: number
  ): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        const cropSize = Math.min(img.width, img.height);

        const offsetX = (img.width - cropSize) / 2;
        const offsetY = (img.height - cropSize) / 2;

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(
          img,
          offsetX,
          offsetY,
          cropSize,
          cropSize,
          0,
          0,
          width,
          height
        );

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File(
                [blob],
                file.name.split(".").shift() + ".webp",
                {
                  type: "image/webp",
                  lastModified: Date.now(),
                }
              );
              resolve(resizedFile);
            }
          },
          "image/webp",
          quality
        );
      };
    });
  };

  static reduceImageQuality = async (
    file: File,
    quality: number
  ): Promise<File> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;

        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const reducedQualityFile = new File(
                [blob],
                file.name.split(".").shift() + ".webp",
                {
                  type: "image/webp",
                  lastModified: Date.now(),
                }
              );
              resolve(reducedQualityFile);
            }
          },
          "image/webp",
          quality
        );
      };
    });
  };
}

export default ImageResizer;
