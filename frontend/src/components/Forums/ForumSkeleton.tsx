const ForumSkeleton = () => {
  return (
    <div className="flex animate-pulse cursor-pointer justify-between gap-12  rounded-md bg-white p-4 shadow-md dark:bg-primaryDark2">
      <div className="flex flex-col gap-2">
        <p className="h-4 w-96 rounded-md bg-gray-300 text-blue-50"></p>
        <div className="h-2 w-24 rounded-md bg-gray-300"></div>
        <div className="flex items-center gap-4 text-sm">
          <p className="h-3 w-36 rounded-md bg-gray-300"></p>
          <p className="h-3 w-16 rounded-md bg-gray-300"></p>
        </div>
      </div>
      <div className="mr-16 flex items-center gap-8">
        <div className="h-2 w-12 rounded-md bg-gray-300"></div>
        <div className="h-2 w-8 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
};

export default ForumSkeleton;
