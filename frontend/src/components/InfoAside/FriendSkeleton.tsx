const FriendSkeleton = () => {
  return (
    <div className="p-2 bg-white dark:bg-primaryDark2 rounded-md shadow-md w-full  animate-pulse">
      <div className="flex gap-6 items-center">
        <div className="rounded-full bg-gray-300 h-10 w-10 "></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex flex-col gap-2">
            <div className="h-3 bg-gray-300 rounded w-36 "></div>
            <div className="h-2 bg-gray-300 rounded w-18 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendSkeleton;
