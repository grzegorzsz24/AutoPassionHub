interface FilterState {
  page: number;
  size: number;
  title: string;
  carBrand: string;
  carModel: string;
}

interface FilterAction {
  type: string;
  payload?: string | number;
}

const forumFilterReducer = (
  state: FilterState,
  action: FilterAction
): FilterState => {
  switch (action.type) {
    case "SET_TITLE":
      if (typeof action.payload !== "string") throw new Error("Invalid type");
      return {
        ...state,
        page: 1,
        title: action.payload,
        carBrand: "",
        carModel: "",
      };
    case "DELETE_TITLE":
      return {
        ...state,
        title: "",
      };
    case "SET_CAR_BRAND":
      if (typeof action.payload !== "string") throw new Error("Invalid type");
      return {
        ...state,
        page: 1,
        carBrand: action.payload,
        carModel: "",
        title: "",
      };
    case "DELETE_CAR_BRAND":
      return {
        ...state,
        carBrand: "",
        carModel: "",
      };
    case "SET_CAR_MODEL":
      if (typeof action.payload !== "string") throw new Error("Invalid type");
      return {
        ...state,
        page: 1,
        title: "",
        carModel: action.payload,
      };
    case "DELETE_CAR_MODEL":
      return {
        ...state,
        page: 1,
        carModel: "",
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        page: 1,
        title: "",
        carBrand: "",
        carModel: "",
      };
    case "SET_PAGE":
      if (typeof action.payload !== "number") throw new Error("Invalid type");
      return {
        ...state,
        page: action.payload,
      };
    case "SET_SIZE":
      if (typeof action.payload !== "number") throw new Error("Invalid type");
      return {
        ...state,
        size: action.payload,
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export default forumFilterReducer;
