import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "../slices/alertSlice";
const store = configureStore({
  reducer: {
    alert: alertSlice.reducer,
  },
});
export default store;
