import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    clearCredentials: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
