interface FilterState {
  page: number;
  size: number;
  title: string;
}

interface FilterAction {
  type: string;
  payload?: string | number;
}

const articleFilterReducer = (
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
      };
    case "DELETE_TITLE":
      return {
        ...state,
        title: "",
      };

    case "CLEAR_FILTERS":
      return {
        ...state,
        page: 1,
        title: "",
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

export default articleFilterReducer;
