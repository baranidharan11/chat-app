const authReducer = (
  state = {
    data: {}
  },
  action
) => {
  switch (action.type) {
    case "SET_LOGGED_USER":
      return {
        ...state,
        data: action.payload.data,
        token: action.payload.token
      };
    case 'SET_AUTH_STATUS':
      return {
        ...state,
        isAuthed: action.payload,
      };

    default:
      return state;
  }
};

export default authReducer;
