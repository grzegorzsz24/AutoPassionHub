const FriendSkeleton = () => {
  return (
    <div className="p-4 bg-white dark:bg-primaryDark2 rounded-md shadow-md w-full  animate-pulse">
      <div className="flex gap-6 items-center">
        <div className="rounded-full bg-gray-300 h-14 w-14 "></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex flex-col gap-2">
            <div className="h-3 bg-gray-300 rounded w-64 "></div>
            <div className="h-2 bg-gray-300 rounded w-24 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendSkeleton;
