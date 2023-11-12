import Messages from "./Messages";
import NewMessage from "./NewMessage";
import UserProfile from "../../ui/UserProfile";

const ChatConversation = () => {
  return (
    <div className="p-4 flex flex-col h-full">
      <div className="px-4 pb-4 border-b-2 dark:border-blue-600">
        <UserProfile
          imageUrl="http://localhost:8080/images/default_profile_picture.jpg"
          firstName="Piotr"
          lastName="Kowalski"
          nickname="piotrek@77"
          size="medium"
        />
      </div>
      <div className="grow overflow-y-auto py-4">
        <Messages />
      </div>
      <NewMessage />
    </div>
  );
};

export default ChatConversation;
