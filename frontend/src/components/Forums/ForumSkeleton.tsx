const ForumSkeleton = () => {
  return (
    <div className="p-4 bg-white dark:bg-primaryDark2 rounded-md flex  justify-between gap-12 cursor-pointer shadow-md animate-pulse">
      <div className="flex flex-col gap-2">
        <p className="h-4 w-96 bg-gray-300 text-blue-50 rounded-md"></p>
        <div className="h-2 w-24 bg-gray-300 rounded-md"></div>
        <div className="flex gap-4 items-center text-sm">
          <p className="h-3 w-36 bg-gray-300 rounded-md"></p>
          <p className="h-3 w-16 bg-gray-300 rounded-md"></p>
        </div>
      </div>
      <div className="flex items-center gap-8 mr-16">
        <div className="h-2 w-12 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-8 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default ForumSkeleton;
