import InfoAside from "../components/InfoAside/InfoAside";
import Posts from "../components/Posts/Posts";

const MainPage = () => {
  return (
    <div className="flex h-full gap-8 md:px-4 xl:px-6">
      <Posts />
      <InfoAside />
    </div>
  );
};

export default MainPage;
