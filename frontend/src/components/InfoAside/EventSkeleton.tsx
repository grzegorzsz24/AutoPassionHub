const EventSkeleton = () => {
  return (
    <div className="flex gap-2 items-center animate-pulse">
      <div className="flex flex-col w-16 h-16 bg-gray-300 text-blue-50 rounded-md items-center justify-center py-1"></div>
      <div className="flex flex-col gap-2 px-2 max-w-[14rem]">
        <div className="h-3 w-44 bg-gray-300 rounded"></div>
        <div className="h-2 w-12 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default EventSkeleton;
