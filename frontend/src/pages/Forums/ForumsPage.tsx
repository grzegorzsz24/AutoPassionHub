import ForumFilters from "./ForumFilters";
import { useForumFilter } from "../../reducers/ForumFilterReducer";

const ForumsPage = () => {
  const [filterState, filterDispatch] = useForumFilter();
  const { page, size, title, carBrand, carModel } = filterState;
  console.log(page, size, title, carBrand, carModel);

  return (
    <div>
      <ForumFilters
        title={title}
        carBrand={carBrand}
        carModel={carModel}
        dispatch={filterDispatch}
      />
    </div>
  );
};

export default ForumsPage;
