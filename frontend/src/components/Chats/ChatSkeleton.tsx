const ChatSkeleton = () => {
  return (
    <div className="w-full animate-pulse  border-b-2 border-gray-300 px-2 py-4">
      <div className="flex items-center gap-6">
        <div className="h-10 w-10 rounded-full bg-gray-300 "></div>
        <div className="flex-1 space-y-6">
          <div className="flex flex-col gap-2">
            <div className="h-3 w-48 rounded bg-gray-300 "></div>
            <div className="h-2 w-24 rounded bg-gray-300 "></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;
