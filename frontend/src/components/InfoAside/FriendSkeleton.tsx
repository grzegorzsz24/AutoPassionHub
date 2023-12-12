const FriendSkeleton = () => {
  return (
    <div className="w-full animate-pulse rounded-md bg-white p-2 shadow-md  dark:bg-primaryDark2">
      <div className="flex items-center gap-6">
        <div className="h-10 w-10 rounded-full bg-gray-300 "></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-36 rounded bg-gray-300 "></div>
            <div className="w-18 h-2 rounded bg-gray-300 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendSkeleton;
