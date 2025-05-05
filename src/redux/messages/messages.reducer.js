const initialState = {
  data: [],
};

export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    case "SAVE_MESSAGES":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};