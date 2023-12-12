const LoadingPost = () => {
  return (
    <div className="w-full max-w-2xl animate-pulse rounded-md bg-white p-4 shadow-md dark:bg-primaryDark2">
      <div className="flex space-x-4">
        <div className="h-12 w-12 rounded-full bg-gray-300 "></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="h-2 w-64 rounded bg-gray-300 "></div>
              <div className="h-2 w-8 rounded bg-gray-300 "></div>
            </div>

            <div className="h-2 w-24 rounded bg-gray-300 "></div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4 ">
              <div className="col-span-2 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-1 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-1 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-2 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-3 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-2 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-1 h-2 rounded bg-gray-300 "></div>
              <div className="col-span-3 h-2 rounded bg-gray-300 "></div>
            </div>
            <div className="flex gap-2">
              <div className="h-2 w-8 rounded bg-gray-300 "></div>
              <div className="h-2 w-8 rounded bg-gray-300 "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingPost;
