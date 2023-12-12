const EventSkeleton = () => {
  return (
    <div className="flex animate-pulse items-center gap-2">
      <div className="flex h-16 w-16 flex-col items-center justify-center rounded-md bg-gray-300 py-1 text-blue-50"></div>
      <div className="flex max-w-[14rem] flex-col gap-2 px-2">
        <div className="h-3 w-44 rounded bg-gray-300"></div>
        <div className="h-2 w-12 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default EventSkeleton;
