const LoadingPost = () => {
  return (
    <div className="p-4 bg-white dark:bg-primaryDark2 rounded-md shadow-md max-w-2xl w-full animate-pulse">
      <div className="flex space-x-4">
        <div className="rounded-full bg-gray-300 h-12 w-12 "></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="h-2 bg-gray-300 rounded w-64 "></div>
              <div className="h-2 bg-gray-300 rounded w-8 "></div>
            </div>

            <div className="h-2 bg-gray-300 rounded w-24 "></div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4 ">
              <div className="h-2 bg-gray-300 rounded col-span-2 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-1 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-1 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-2 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-3 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-2 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-1 "></div>
              <div className="h-2 bg-gray-300 rounded col-span-3 "></div>
            </div>
            <div className="flex gap-2">
              <div className="h-2 bg-gray-300 rounded w-8 "></div>
              <div className="h-2 bg-gray-300 rounded w-8 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPost;
