import Logo from "../../ui/Logo";
import MessagesButton from "../../ui/MessagesButton";
import NotificationButton from "../../ui/NotificationButton";
import SearchBar from "../../ui/SearchBar/SearchBar";
import SwitchThemeButton from "../../ui/SwitchThemeButton";
import UserProfileButton from "../../ui/UserProfileButton";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-primaryDark text-bg-primaryDark dark:text-blue-50 shadow-sm px-2 py-1 md:px-4 md:py-2 xl:px-6 flex items-center justify-between gap-4 dark:border-b-2 border-blue-600">
      <div className="hidden sm:block">
        <Logo />
      </div>
      <SearchBar />
      <div className="flex items-center gap-4 md:gap-8 xl:gap-16">
        <div className="hidden sm:flex items-center gap-8">
          <MessagesButton />
          <NotificationButton />
        </div>
        <UserProfileButton />
      </div>
      <SwitchThemeButton />
    </nav>
  );
};

export default Navbar;
