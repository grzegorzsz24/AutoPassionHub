import InfoAside from "../components/InfoAside/InfoAside";
import Posts from "../components/Posts/Posts";

const MainPage = () => {
  return (
    <div className="h-full  md:px-4 xl:px-6  flex gap-8">
      <Posts />
      <InfoAside />
    </div>
  );
};

export default MainPage;
