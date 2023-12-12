import Logo from "../../ui/Logo";
import MessagesButton from "../../ui/MessagesButton";
import NotificationButton from "../../ui/NotificationButton";
import SearchBar from "../../ui/SearchBar/SearchBar";
import SwitchThemeButton from "../../ui/SwitchThemeButton";
import UserProfileButton from "../../ui/UserProfileButton";

const Navbar = () => {
  return (
    <nav className="text-bg-primaryDark flex items-center justify-between gap-4 bg-white px-2 py-1 shadow-sm dark:bg-primaryDark dark:text-blue-50 md:px-4 md:py-2 xl:px-6">
      <div className="hidden sm:block">
        <Logo />
      </div>
      <SearchBar />
      <div className="flex items-center gap-4 md:gap-8 xl:gap-16">
        <div className="hidden items-center gap-8 sm:flex">
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
