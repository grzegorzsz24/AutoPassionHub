import { BiSolidMessageDetail } from "react-icons/bi";

const MessagesButton = () => {
  return (
    <button className="text-3xl text-blue-950 dark:text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md relative">
      <BiSolidMessageDetail />
      <div className="bg-green-500 absolute bottom-4 left-4 text-sm w-6 h-6 rounded-full flex items-center justify-center text-blue-50 dark:text-blue-900 font-bold">
        5
      </div>
    </button>
  );
};

export default MessagesButton;
