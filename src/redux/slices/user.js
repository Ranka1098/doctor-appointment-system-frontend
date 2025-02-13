import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    logOutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, logOutUser } = userSlice.actions;
