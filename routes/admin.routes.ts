const MAIN_API = "/api/admin";

export const ADMIN_ROUTES = {
  USERS: {
    CREATE_USER: {
      URL: MAIN_API + "/users/create-user",
    },
    FETCH_ALL: {
      URL: MAIN_API + "/users/fetch-all",
      KEY: "ADMIN:USERS:ALL",
    },
  },
};
