import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "../slices/alertSlice";
import { userSlice } from "../slices/user";
const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
    user: userSlice.reducer,
  },
});
export default store;
