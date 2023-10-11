import LoadingSpinner from "./ui/LoadingSpinner";
import SwitchThemeButton from "./ui/SwitchThemeButton";
import { useAppSelector } from "./store/store";

function App() {
  const isLoading = useAppSelector((state) => state.loading.loading);
  return (
    <div className="bg-blue-50 dark:bg-primaryDark h-screen w-full">
      <h1>MotoSplot</h1>
      <SwitchThemeButton />
      {isLoading && <LoadingSpinner />}
    </div>
  );
}

export default App;
