const NotificationSkeleton = () => {
  return (
    <div className="flex items-center gap-2 w-full p-2 rounded-md animate-pulse">
      <div className="h-8 w-8 rounded-full bg-gray-300"></div>
      <div className="flex flex-col gap-2">
        <div className="h-2 w-36 bg-gray-300 rounded-md"></div>
        <div className="h-2 w-28 bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
