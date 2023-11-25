const ChatSkeleton = () => {
  return (
    <div className="px-2 py-4  w-full border-b-2 border-gray-300 animate-pulse">
      <div className="flex gap-6 items-center">
        <div className="rounded-full bg-gray-300 h-10 w-10 "></div>
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-2">
            <div className="h-3 bg-gray-300 rounded w-48 "></div>
            <div className="h-2 bg-gray-300 rounded w-24 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
