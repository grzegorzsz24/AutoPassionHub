import Events from "./Events";
import Friends from "./Friends";

const InfoAside = () => {
  return (
    <aside className="bg-white dark:bg-primaryDark2 dark:text-blue-50 my-4 rounded-md flex flex-col gap-4">
      <Events />
      <Friends />
    </aside>
  );
};

export default InfoAside;
