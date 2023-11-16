import InfoAside from "../components/InfoAside/InfoAside";
import Posts from "../components/Posts/Posts";
import { useStompClient } from "react-stomp-hooks";
import { useSubscription } from "react-stomp-hooks";

const MainPage = () => {
  // useSubscription("/user/2/queue/messages", (message) => console.log(message));

  const stompClient = useStompClient();
  const handleClock = () => {
    if (stompClient) {
      stompClient.publish({
        destination: "/app/chat",
        body: JSON.stringify({
          senderId: 2,
          receiverId: 1,
          message: "Siema",
        }),
      });
    }
  };
  return (
    <div className="h-full  px-6  flex gap-8">
      <Posts />
      <InfoAside />
      <button onClick={handleClock} className="text-blue-600">
        Click
      </button>
    </div>
  );
};

export default MainPage;
