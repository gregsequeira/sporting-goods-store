import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userDetails: null, // Stores registered user details
    isLoggedIn: false, // Tracks login status
  },
  reducers: {
    register: (state, action) => {
      state.userDetails = action.payload; // Save user details
    },
    login: (state, action) => {
      const { username, password } = action.payload;
      if (
        state.userDetails &&
        state.userDetails.username === username &&
        state.userDetails.password === password
      ) {
        state.isLoggedIn = true;
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
