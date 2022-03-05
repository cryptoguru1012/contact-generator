import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: true,
  },
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setIsAuthenticated } = userSlice.actions;

export const isAuthenticatedSelector = (state) => state.user.isAuthenticated;

export default userSlice.reducer;
