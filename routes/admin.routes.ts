const MAIN_API = "/api/admin";

export const ADMIN_ROUTES = {
  SESSIONS: {
    FETCH_ALL: {
      URL: MAIN_API + "/sessions/fetch-all",
      KEY: "ADMIN:SESSIONS:ALL",
    },
  },
  USERS: {
    CREATE_USER: {
      URL: MAIN_API + "/users/create-user",
    },
    DELETE_USER: {
      URL: MAIN_API + "/users/delete-user",
    },
    EDIT_USER: {
      URL: MAIN_API + "/users/edit-user",
    },
    FETCH_ALL: {
      URL: MAIN_API + "/users/fetch-all",
      KEY: "ADMIN:USERS:ALL",
    },
  },
  SPORTS: {
    CREATE_SPORT: {
      URL: MAIN_API + "/sports/create-sport",
    },
    FETCH_ALL: {
      URL: "/api/trainhub/sports/list",
      KEY: "ADMIN:SPORTS:ALL",
    },
  },
};
