import Friend from "./Friend";
import { useAppSelector } from "../../store/store";

const Friends = () => {
  const { chats } = useAppSelector((state) => state.socket);

  return (
    <div className="px-4 py-4 overflow-y-auto">
      <h2 className="font-bold ml-4 mb-2">Znajomi</h2>
      {chats.length === 0 && <p className="text-center">Brak znajomych</p>}
      <div className="flex flex-col gap-2">
        {chats.map((chat) => (
          <Friend key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
