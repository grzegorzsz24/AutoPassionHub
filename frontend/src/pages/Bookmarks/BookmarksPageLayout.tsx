import BookmarksMenu from "../../components/Menu/BookmarksMenu";
import { Outlet } from "react-router-dom";
import PageWithAsideMenuLayout from "../PageWithAsideMenuLayout";

const BookmarksPageLayout = () => {
  return (
    <PageWithAsideMenuLayout menu={<BookmarksMenu />} content={<Outlet />} />
  );
};

export default BookmarksPageLayout;
