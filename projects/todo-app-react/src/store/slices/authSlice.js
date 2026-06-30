import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("user");

const initialState = {
  user: savedUser ? JSON.parse(savedUser) : null,
  isAuthenticated: !!savedUser, // Será true si savedUser tiene un valor, y false si es null
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload)); // saves it on the browser
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); // clear the session from browser
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
