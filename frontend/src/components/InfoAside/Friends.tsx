import Friend from "./Friend";
import { useAppSelector } from "../../store/store";

const Friends = () => {
  const { chats } = useAppSelector((state) => state.socket);

  return (
    <div className="overflow-y-auto px-4 py-4">
      <h2 className="mb-2 ml-4 font-bold">Znajomi</h2>
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
