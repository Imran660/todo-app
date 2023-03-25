let initialState = {
  isLogin: false,
  //   user:{}
};
export const authReducer = (
  state = initialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLogin: true,
      };
    case "LOGOUT_SUCCESS":
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
};
