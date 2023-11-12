const EventSkeleton = () => {
  return (
    <div className="p-4 bg-white dark:bg-primaryDark2 rounded-md flex items-center gap-6 cursor-pointer shadow-md animate-pulse w-full">
      <div className="flex flex-col w-24 h-20 bg-gray-300 text-blue-50 rounded-md items-center justify-center py-1"></div>
      <div className="flex flex-col gap-2 px-2 max-w-[14rem]">
        <div className="h-4 w-96 bg-gray-300 rounded"></div>
        <div className="h-3 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default EventSkeleton;
