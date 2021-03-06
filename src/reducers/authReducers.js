/** @format */

const auth_reducers = (state, action) => {
  if (action.type === "SET_LOADING") {
    return { ...state, loading: true };
  }

  if (action.type === "UNSET_LOADING") {
    return { ...state, loading: false };
  }

  if (action.type === "IS_AUTHENTICATED") {
    if (state.token.length > 0) {
      return { ...state, isAuthenticated: true };
    } else {
      return { ...state, isAuthenticated: false };
    }
  }
  if (action.type === "GET_ADMIN_BEAR_TOKEN") {
    return { ...state, bearToken: "heo" };
  }

  if (action.type === "LOGIN_SUCCESS") {
    const { access_token: token } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      token: token,
      user: action.payload,
    };
  }

  if (action.type === "LOGOUT_ACTION") {
    return { ...state, isAuthenticated: false, user: {}, token: "" };
  }

  if (action.type === "UPDATE_USER") {
    let { user } = state;
    user.role = action.payload;
    return { ...state, user };
  }

  if (action.type === "SET_SEARCH_RESULT") {
    const { searchCreator } = state;
    const newsearch = { ...action.payload, subscribe: "" };
    return { ...state, searchCreator: newsearch };
  }

  if (action.type === "DEFAULT_LOGGED") {
    return {
      ...state,
      isAuthenticated: true,
      user: {
        id: 1,
        name: "Admin",
        role: "admin",
        status: "Active",
        access_token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvbG9naW4iLCJpYXQiOjE2MzIxNTEyNjIsIm5iZiI6MTYzMjE1MTI2MiwianRpIjoieVlPSUd5bHhHOE15YlJDaCIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.XI7ZZqTuWDmL0bNqh7rw1Z27qWovjVgxmS-2uW_qVm4",
        token_type: "Bearer",
      },
      token:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC92MVwvbG9naW4iLCJpYXQiOjE2MzIxNTEyNjIsIm5iZiI6MTYzMjE1MTI2MiwianRpIjoieVlPSUd5bHhHOE15YlJDaCIsInN1YiI6MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSJ9.XI7ZZqTuWDmL0bNqh7rw1Z27qWovjVgxmS-2uW_qVm4",
    };
  }

  if (action.type === "REGION_LOAD") {
    return {
      ...state,
      regions: action.payload,
    };
  }

  // return state
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default auth_reducers;
