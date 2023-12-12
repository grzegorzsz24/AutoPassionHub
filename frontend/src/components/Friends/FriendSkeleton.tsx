const FriendSkeleton = () => {
  return (
    <div className="w-full animate-pulse bg-white p-4 shadow-md dark:bg-primaryDark2  sm:rounded-md">
      <div className="flex items-center gap-6">
        <div className="h-14 w-14 rounded-full bg-gray-300 "></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-64 rounded bg-gray-300 "></div>
            <div className="h-2 w-24 rounded bg-gray-300 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendSkeleton;
