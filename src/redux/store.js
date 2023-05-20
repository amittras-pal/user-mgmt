import { configureStore } from "@reduxjs/toolkit";
import rolesSlice from "./roles.slice";
import userSlice from "./user.slice";

export const store = configureStore({
  reducer: {
    users: userSlice,
    roles: rolesSlice,
  },
});
