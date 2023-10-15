import Logo from "../../ui/Logo";
import MessagesButton from "../../ui/MessagesButton";
import NotificationButton from "../../ui/NotificationButton";
import SearchBar from "../../ui/SearchBar";
import SwitchThemeButton from "../../ui/SwitchThemeButton";
import UserProfileButton from "../../ui/UserProfileButton";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-primaryDark text-bg-primaryDark dark:text-blue-50 shadow-sm px-4 py-4 xl:px-6 flex items-center justify-between dark:border-b-2 border-blue-600">
      <Logo />
      <SearchBar />
      <div className="flex items-center gap-8 xl:gap-16">
        <MessagesButton />
        <NotificationButton />
        <UserProfileButton />
      </div>
      <SwitchThemeButton />
    </nav>
  );
};

export default Navbar;
