import { BiSolidMessageDetail } from "react-icons/bi";

const MessagesButton = () => {
  return (
    <button className="text-2xl xl:text-3xl text-blue-950 dark:text-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-md relative hidden tablet:block group">
      <BiSolidMessageDetail className="group-hover:scale-125 transition-all" />
      <div className="bg-green-500 absolute bottom-4 left-4 text-sm w-4 h-4 xl:w-6 xl:h-6 rounded-full flex items-center justify-center text-blue-50 dark:text-blue-900 font-bold group-hover:ring-4 group-hover:ring-green-300 transition-all">
        5
      </div>
    </button>
  );
};

export default MessagesButton;
