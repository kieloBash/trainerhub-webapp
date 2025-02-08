const MAIN_API = "/api/user";

export const USER_ROUTES = {
  TRAINERS: {
    FETCH_ALL: {
      URL: MAIN_API + "/trainers/fetch-all",
      KEY: "USER:TRAINERS:ALL",
    },
  },
  PROFILE: {
    USER_CHANGE: {
      URL: MAIN_API + "/profile/user",
      KEY: "",
    },
  },
};
