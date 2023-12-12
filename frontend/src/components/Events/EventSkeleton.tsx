const EventSkeleton = () => {
  return (
    <div className="flex w-full animate-pulse cursor-pointer items-center gap-6 rounded-md bg-white p-4 shadow-md dark:bg-primaryDark2">
      <div className="flex h-20 w-24 flex-col items-center justify-center rounded-md bg-gray-300 py-1 text-blue-50"></div>
      <div className="flex max-w-[14rem] flex-col gap-2 px-2">
        <div className="h-4 w-96 rounded bg-gray-300"></div>
        <div className="h-3 w-12 rounded bg-gray-300"></div>
      </div>
    </div>
  );
};

export default EventSkeleton;
