const NotificationSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse items-center gap-2 rounded-md p-2">
      <div className="h-8 w-8 rounded-full bg-gray-300"></div>
      <div className="flex flex-col gap-2">
        <div className="h-2 w-36 rounded-md bg-gray-300"></div>
        <div className="h-2 w-28 rounded-md bg-gray-300"></div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
